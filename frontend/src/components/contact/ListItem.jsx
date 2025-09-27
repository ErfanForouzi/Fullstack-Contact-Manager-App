import {NavLink, useSearchParams} from "react-router-dom"
import { MdPerson } from "react-icons/md";
export default function ListItem({contact}){
    const [searchParams,setSearchParams] = useSearchParams();
    const query = searchParams.get("q") ? `?q=${searchParams.get("q")}` : ''
    return(
        <div className="list-item">
        <NavLink to={`/contact/${contact.id + query}`}>
            {contact.avatar ? (
                <img src={contact.avatar} className="list-item-image" />
            ) : (
                <div className="list-item-image">
                    <MdPerson size={24} />
                </div>
            )}
            {contact.firstname + " " + contact.lastname}
        </NavLink>
    </div>
    )
}