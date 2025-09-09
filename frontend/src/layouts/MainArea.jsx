import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import "./MainArea.css";
import { useAppContext } from "../context/AppContext";
import { MdAdd, MdArrowForward } from "react-icons/md";
export default function MainArea() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const {state} = useAppContext()

  const query = searchParams.get("q") ? `?q=${searchParams.get("q")}` : "";


  return (
    <div className="main-area">
        <header className="border-bottom mb-3">
                <h4 className="mb-0">{state.pageTitle}</h4>
                {location.pathname.startsWith("/contact") ? (
                    <Link to={"/" + query} className="btn btn-primary" style={{ width: 150 }}>
                        <MdArrowForward />
                        <span className="ps-2">بازگشت</span>
                    </Link>
                ) : (
                    <Link
                        to={"/contact/new" + query}
                        className="btn btn-primary"
                        style={{ width: 150 }}
                    >
                        <MdAdd />
                        <span className="ps-2">افزودن مخاطب</span>
                    </Link>
                )}
            </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
