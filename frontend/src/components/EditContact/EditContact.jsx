import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { setContacts, setPageTitle } from "../../context/appReducer";
import ContactForm from "../ContactForm/ContactForm";
import { getContactById, updateContact } from "../../utils/httpRequests";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import LoadingError from "../LoadingError/LoadingError";
import { toast } from "react-toastify";

export default function EditContact() {
  const { state, dispatch } = useAppContext();
  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ویرایش مخاطب";
    dispatch(setPageTitle("ویرایش مخاطب"));
  }, []);

  useEffect(() => {
    fetchContact();
  }, []);

  async function fetchContact() {
    setIsLoading(true);
    setLoadingError(false);
    const result = await getContactById(params.id);
    if (result.success) {
      setContact(result.body);
    } else {
      setLoadingError(result);
    }
    setIsLoading(false);
  }

  async function handleSubmit(data) {
    const t = toast.loading("در حال ویرایش مخاطب...", {
      theme: state.theme === "light" ? "dark" : "light",
      style: { fontFamily: "Vazirmatn" },
    });
    const result = await updateContact(params.id, data);
    if (result.success) {
      toast.update(t, {
        autoClose: 4000,
        theme: "colored",
        isLoading: false,
        render: result.message,
        type: "success",
      });
      const contacts = state.contacts.map((c) => {
        if (c.id === +params.id) {
          return { id: c.id, ...data };
        } else {
          return c;
        }
      });
      dispatch(setContacts(contacts));
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
  if (isLoading) {
    return <Loading />;
  } else if (loadingError && loadingError.status === 404) {
    return (
      <LoadingError
        message={loadingError.message}
        handleAction={() => navigate("/")}
        actionText="بازگشت به صفحه اصلی"
      />
    );
  } else if (loadingError) {
    return (
      <LoadingError
        message={loadingError.message}
        handleAction={fetchContact}
      />
    );
  }
  {
    return (
      <ContactForm type="edit" handleSubmit={handleSubmit} contact={contact} />
    );
  }
}
