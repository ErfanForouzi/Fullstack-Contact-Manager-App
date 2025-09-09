export default function Loading({color}){
    return(
        <div className="d-flex align-items-center flex-column">
            <h4 className="my-3">در حال بارگذاری</h4>
            <span className={`spinner-grow text-${color}`}></span>
        </div>
    )
}