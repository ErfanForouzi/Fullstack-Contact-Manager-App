import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import { EditContactPage, ShowContactPage, WelcomePage,NewContactPage, NotFoundPage} from "../pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {
                index:true,
                element:<WelcomePage/>
            },
            {
                path:"contact",
                children:[
                    {
                        index:true,
                        element:<Navigate to={'/'} replace={true}/>
                    },
                    {
                        path:":id",
                        element:<ShowContactPage/>
                    },
                    {
                        path:"new",
                        element:<NewContactPage/>
                    },
                    {
                        path:"edit/:id",
                        element:<EditContactPage/>
                    }
                ]
            },
            {
                path:"*",
                element:<NotFoundPage/>
            }
        ],
        
    },
]);

export default router;
