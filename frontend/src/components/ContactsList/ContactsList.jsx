import { useAppContext } from "../../context/AppContext"
import ListItem from "../ListItem/ListItem"
import Loading from "../Loading/Loading"
import LoadingError from "../LoadingError/LoadingError"
import "./ContactsList.css"
export default function ContactsList(){
    const {state,fetchContacts} = useAppContext()
    if(state.isLoading){
        return <Loading color={'primary'}/>
    }else if(state.loadingError){
        return <LoadingError message={state.loadingError.message} handleAction={fetchContacts}/>
    }else if(!state.contacts.length){
        return <h6 className="mt-3 text-center text-muted">هیچ مخاطبی یافت نشد</h6>;

    }else{
        return(
            <div className="contacts-list">
                {state.contacts.map((c)=>(
                    <ListItem key={c.id} contact={c}/>
                ))}
            </div>
        )
    }
   
}