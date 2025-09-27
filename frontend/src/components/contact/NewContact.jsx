import { useEffect, useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { setContacts, setPageTitle } from "../../context/appReducer";
import ContactForm from "./ContactForm";
import { createContact } from "../../utils/httpRequests";
import { Helmet } from "react-helmet-async";

export default function NewContact() {
  const { state, dispatch } = useAppContext();
  const [contact, setContact] = useState({});
  const [searchParams,setSearchParams] = useSearchParams()

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setPageTitle("ساخت مخاطب"));
  }, []);

  async function handleSubmit(data) {
    const t = toast.loading("در حال ایجاد مخاطب...", {
      theme: state.theme === "light" ? "dark" : "light",
      style: { fontFamily: "Vazirmatn" },
    });
    const result = await createContact(data);
    if (result.success) {
      toast.update(t, {
        autoClose: 4000,
        theme: "colored",
        isLoading: false,
        render: result.message,
        type: "success",
      });

      if(!searchParams.get("q")){
        const contacts = [result.body,...state.contacts];
        dispatch(setContacts(contacts))
      }

      navigate('/');

    } else {
      toast.update(t, {
        autoClose: 4000,
        theme: "colored",
        isLoading: false,
        render: result.message,
        type: "error",
      });
    }
  }

  return (
    <>
     <Helmet>
            <title>
           ساخت مخاطب
            </title>
          </Helmet>
    <ContactForm type="new" handleSubmit={handleSubmit} />
    </>
  );
}
