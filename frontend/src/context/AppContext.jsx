import { createContext, useContext, useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import appReducer, {
  setContacts,
  setIsLoading,
  setLoadingError,
  setTheme,
} from "./appReducer";
import { getContacts } from "../utils/httpRequests";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(appReducer, {
    theme: "light",
    pageTitle: "صفحه اصلی",
    contacts: [],
    isLoading: false,
    loadingError: false,
  });
  useEffect(() => {
    fetchContacts();
  }, [searchParams]);

  useEffect(()=>{
    const theme = localStorage.theme ?? 'light';
    dispatch(setTheme(theme))

    window.addEventListener("storage",(e)=>{
        if(e.key === 'theme'){
            dispatch(setTheme(e.newValue))
        }
    })
  },[])

  useEffect(()=>{
    localStorage.theme = state.theme;
    if(state.theme === 'dark'){
        document.documentElement.setAttribute("data-bs-theme",'dark')
    }else{
        
        document.documentElement.setAttribute("data-bs-theme",'light')
    }
  },[state.theme])

  async function fetchContacts() {
    dispatch(setIsLoading(true));
    dispatch(setLoadingError(false));

    const result = await getContacts(searchParams.get("q") ?? "");
    if (result.success) {
      dispatch(setContacts(result.body));
    } else {
      dispatch(setLoadingError(result));
    }
    dispatch(setIsLoading(false));
  }
  return (
    <AppContext.Provider value={{ state, dispatch,fetchContacts }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
