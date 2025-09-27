import { useEffect, useState } from "react";

import "./ContactForm.css";

export default function ContactForm({ type, handleSubmit, contact }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if(type === 'edit'){
        setFirstname(contact.firstname)
        setLastname(contact.lastname)
        setDescription(contact.description)
        setMobile(contact.mobile)
        setEmail(contact.email)
        setAvatar(contact.avatar)
    }
  },[])

  async function onSubmit(event) {
    event.preventDefault();
    const e = {};
    if (firstname.length < 2) {
        e.firstname = enToFa("نام باید حداقل 2 کاراکتر باشد");
    }
    if (lastname.length < 2) {
        e.lastname = enToFa("نام خانوادگی باید حداقل 2 کاراکتر باشد");
    }
    if(mobile && (mobile.length !== 11 || isNaN(Number(faToEn(mobile))) )){
        e.mobile = enToFa("شماره تلفن همراه باید 11 رقم باشد");
    }
    if (email && !/.+@.+\..+/.test(email)) {
        e.email = "لطفا یک ایمیل معتبر وارد کنید";
    }
    if (avatar && !/https?:\/\/.{10,}/.test(avatar)) {
        e.avatar = "لطفا یک آدرس معتبر برای تصویر وارد کنید";
    }
    if (description.length > 200) {
        e.description = enToFa("توضیحات نباید بیشتر از 200 کاراکتر باشد");
    }
    setErrors(e);

    if(Object.keys(e).length){
        return
    }
    setIsSubmiting(true)
    await handleSubmit({firstname,lastname,email,mobile,description,avatar})
    setIsSubmiting(false)
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="row gx-4 gy-3 mb-3">
        <div className="col-6">
          <label className="m-1">نام</label>
          <input
            className="form-control"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          {errors.firstname && (
            <label className="text-danger m-1 small">{errors.firstname}</label>
          )}
        </div>
        <div className="col-6">
          <label className="m-1">نام خانوادگی</label>
          <input
            className="form-control"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          {errors.lastname && (
            <label className="text-danger m-1 small">{errors.lastname}</label>
          )}
        </div>
        <div className="col-6">
          <label className="m-1">شماره تلفن همراه</label>
          <input
            className="form-control"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {errors.mobile && (
            <label className="text-danger m-1 small">{errors.mobile}</label>
          )}
        </div>
        <div className="col-6">
          <label className="m-1">ایمیل</label>
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <label className="text-danger m-1 small">{errors.email}</label>
          )}
        </div>
        <div className="col-12">
          <label className="m-1">آدرس تصویر پروفایل</label>
          <img
            src={avatar}
            width={40}
            height={40}
            className="rounded-circle ms-3 mb-1"
          />
          <input
            type="text"
            className="form-control ltr"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          {errors.avatar && (
            <label className="text-danger m-1 small">{errors.avatar}</label>
          )}
        </div>
        <div className="col-12">
          <label className="m-1">توضیحات</label>
          <textarea
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <label className="text-danger m-1 small">
              {errors.description}
            </label>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {isSubmitting ? (
          <button className="btn btn-primary disabled">
            <span className="spinner-grow"></span>
          </button>
        ) : (
          <button className="btn btn-primary">
            {type === "edit" ? "ثبت تغییرات" : "ایجاد مخاطب"}
          </button>
        )}
      </div>
    </form>
  );
}
