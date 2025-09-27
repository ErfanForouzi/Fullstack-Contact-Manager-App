import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { setPageTitle } from "../context/appReducer";
import { Helmet } from "react-helmet-async";

export default function WelcomePage() {
  const { dispatch } = useAppContext();

  useEffect(() => {
    dispatch(setPageTitle("صفحه اصلی"));
  }, []);

  return (
    <div className="text-center pt-3">
      <Helmet>
        <title>
            نرم افزار مدیریت مخاطبین</title>
      </Helmet>
      <h2 className="mb-5">به نرم افزار مدیریت مخاطبین خوش آمدید</h2>
      <p className="mt-5 opacity-75">
        جهت ایجاد مخاطب جدید از دکمه بالا استفاده کنید
      </p>
      <p className="mt-4 opacity-75">
        جهت مشاهده و ویرایش مخاطبین موجود از منوی سمت راست استفاده کنید
      </p>
    </div>
  );
}
