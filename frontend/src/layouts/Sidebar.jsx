import ContactsList from "../components/ContactsList/ContactsList";
import Search from "../components/Search/Search";
import ThemeChanger from "../components/ThemeChanger/ThemeChanger";
import "./Sidebar.css";
export default function Sidebar(){
    return(
        <div className="sidebar">
            <Search/>
            <ThemeChanger/>
            <ContactsList/>
        </div>
    )
}