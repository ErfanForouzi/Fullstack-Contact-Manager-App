import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";


export default function NotFoundPage() {
    useEffect(() => {
        document.title = "صفحه مورد نظر یافت نشد";
    }, []);

    return (
        <div className="d-flex flex-column align-items-center pt-3">
              <Helmet>
        <title>صفحه مورد نظر یافت نشد</title>
      </Helmet>
            <h2 className="mb-5">صفحه مورد نظر شما یافت نشد</h2>
            <Link to="/" className="btn btn-primary btn-lg">
                بازگشت
            </Link>
            
        </div>
    );
}
