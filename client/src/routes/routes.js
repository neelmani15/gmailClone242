import { lazy } from "react";

const Main = lazy(()=>import("../pages/Main"));
const Email = lazy(()=>import("../component/Email"));
const ViewEmail = lazy(()=>import("../component/ViewEmail"));

export const routes = {
    main:{
        path:'/',
        element: Main
    },
    email:{
        path:'/emails',
        element:Email
    },
    invalid:{
        path:'/*',
        element:Email
    },
    view:{
        path:'/view',
        element:ViewEmail
    }
}