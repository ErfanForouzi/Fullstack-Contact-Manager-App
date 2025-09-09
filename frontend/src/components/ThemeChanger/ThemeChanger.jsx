import { MdDarkMode, MdLightMode } from "react-icons/md";
import "./ThemeChanger.css";
import { useAppContext } from "../../context/AppContext";
import { setTheme } from "../../context/appReducer";
export default function ThemeChanger(){
    const {state,dispatch} = useAppContext()

    function handleChangeTheme(){
        dispatch(setTheme(state.theme === 'light'?'dark':'light'))
    }
    return(
        <div className="theme-changer">
            <span>قالب سایت</span>
            <div onClick={handleChangeTheme} className="change-button">
                {state.theme === 'dark' ? <MdLightMode size={20}/> : <MdDarkMode size={20}/>}
            </div>
        </div>
    )
}