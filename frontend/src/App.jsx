import {HelmetProvider} from "react-helmet-async"
import {ToastContainer} from "react-toastify"
import Sidebar from "./layouts/Sidebar";
import AppContextProvider from "./context/AppContext";
import MainArea from "./layouts/MainArea";



export default function App() {
  return (
   <HelmetProvider>
     <AppContextProvider>
      <div className="app">
        <Sidebar />
        <MainArea />
      </div>
    <ToastContainer
    rtl={true}
    theme="colored"
    position="bottom-left"
    pauseOnFocusLoss={false}
    />
    </AppContextProvider>
   </HelmetProvider>
  );
}
