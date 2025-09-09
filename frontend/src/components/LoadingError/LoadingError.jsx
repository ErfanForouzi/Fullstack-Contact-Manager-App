export default function LoadingError({message,handleAction,actionText="تلاش دوباره"}){
    return(
        <div className="d-flex align-items-center flex-column">
        <h4 className="my-3">{message}</h4>
        <button className="btn btn-primary" onClick={handleAction}>
            {actionText}
        </button>
    </div>
    )
}