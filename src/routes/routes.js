import React from "react";
import {About} from "../pages/About";
import {Posts} from "../pages/Posts";
import {PostIdPage} from "../pages/PostIdPage";
import {Login} from "../pages/Login";


export const privetRoutes = [
    {path: '/about' , element: <About />},
    {path:  '/posts', element: <Posts />},
    {path:  '/posts/:id/comments', element: <PostIdPage />},
]

export const publicRoutes = [
    {path: '/login' , element: <Login />},

]
