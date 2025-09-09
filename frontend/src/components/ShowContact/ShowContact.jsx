import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { setContacts, setPageTitle } from "../../context/appReducer";
import { deleteContact, getContactById } from "../../utils/httpRequests";
import Loading from "../Loading/Loading";
import LoadingError from "../LoadingError/LoadingError";
import { MdFace } from "react-icons/md";
import ModalC from "../Modal/Modal";

import "./ShowContact.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";


export default function ShowContact() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [contact, setContact] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();
  const { state, dispatch } = useAppContext();

  const query = searchParams.get("q") ? `?q=${searchParams.get("q")}` : "";

  useEffect(() => {
    dispatch(setPageTitle("مشاهده مخاطب"));
  }, []);

  useEffect(() => {
    fetchContact();
  }, [params.id]);

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
  async function handleDelete() {
    setShowDeleteModal(false);
    setIsDeleting(true)

    const result = await deleteContact(params.id);
    if(result.success){
        const newContacts  = state.contacts.filter((c)=>c.id !==+params.id);
        dispatch(setContacts(newContacts));
        toast.success(result.message,{style:{fontFamily:"Vazirmatn"}})
        navigate("/" + query,{replace:true})
    }else{
        toast.error(result.message,{style:{fontFamily:"Vazirmatn"}})

    }
    setIsDeleting(false)

  }

  if (isLoading) {
    return <Loading color={"primary"} />;
  } else if (loadingError && loadingError.status === 404) {
    return (
      <LoadingError
        message={loadingError.message}
        handleAction={() => navigate("/" + query)}
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
  } else {
    return (
      <>
      <div className="show-contact">
            <Helmet>
                    <title>
                   نمایش مخاطب
                    </title>
                  </Helmet>
        <div className="header">
          <div className="avatar">
            {contact.avatar ? (
              <img src={contact.avatar} />
            ) : (
              <MdFace size={180} />
            )}
          </div>

          <div>
            <h3 className="mb-5">
              {contact.firstname + " " + contact.lastname}
            </h3>
            <div>
              <Link
                to={"/contact/edit/" + contact.id + query}
                className="btn btn-primary me-4"
              >
                ویرایش مخاطب
              </Link>
              {isDeleting ? (
                <button className="btn btn-danger disabled">
                  <span className="spinner-grow"></span>
                </button>
              ) : (
                <button   className="btn btn-danger" onClick={()=>setShowDeleteModal(true)}>
                  حذف مخاطب
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="details">
          <table
            className="table table-borderless border-top"
            style={{ width: "400px" }}
          >
            <tbody>
              <tr className="border-bottom">
                <td style={{ width: "100px" }}>تلفن</td>
                <td>{enToFa(contact.mobile)}</td>
              </tr>
              <tr className="border-bottom">
                <td style={{ width: "100px" }}>ایمیل</td>
                <td>{contact.email}</td>
              </tr>
              <tr className="border-bottom">
                <td>توضیحات</td>
                <td>{contact.description}</td>
              </tr>
            </tbody>
          </table>
        </div>

      
      </div>
      <ModalC
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title={`حذف ${contact.firstname + " " + contact.lastname}`}
        body="آیا از حذف این مخاطب دارید؟"
      >
        <button
          onClick={()=>setShowDeleteModal(false)}
          type="button"
          className="btn btn-secondary fw-bolder"
        >
          انصراف
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="btn btn-primary fw-bolder"
        >
          حذف
        </button>
      </ModalC>
      </>
    );
  }
}
