import { createPortal } from "react-dom";

const ModalC = ({ isOpen, open, title, body,children}) => {
  return (
    <>
      {isOpen &&
        createPortal (
          <div onClick={()=>open(false)} className="modal z-3" style={{display:"block",backgroundColor:"rgba(0,0,0,0.4)"}}>
            <div onClick={event=>event.stopPropagation()} className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header d-flex justify-content-between">
                    <h5 className="modal-title fw-bolder">
                        {title}
                    </h5>
                    <button onClick={()=>open(false)} type="button" className="btn-close m-0">

                    </button>
                </div>
                <div className="modal-body m-3">
                    <p className="mb-0">
                        {body}
                    </p>
                </div>
                <div className="modal-footer">
                    {children}
                </div>
            </div>
            </div>
          </div>,
          document.getElementById("modal")
        )}
    </>
  );
};
export default ModalC;
