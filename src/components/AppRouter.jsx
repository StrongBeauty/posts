import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {Login} from "../pages/Login";
import {Posts} from "../pages/Posts";
import {AuthContext} from "../context/context";
import {privetRoutes, publicRoutes} from "../routes/routes";
import {Loader} from "./UI/Loader/Loader";
import {Error} from "../pages/Error";
import {Navbar} from "./UI/Navbar/Navbar";


export const AppRouter = () => {
    const {isAuth, setIsAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)

    if (isLoading) {
        return <Loader/>
    }
    return (
        <Routes>
            {isAuth
                ?
                <>
                {privetRoutes.map(r =>
                    <Route key={r.path} path={r.path} element={r.element}/>)}
                    <Route path='/*' element={<Error />}/>
                    </>
                // <Route path='/about' element={<About />} />
                //       <Route path='/posts' element={<Posts />} />
                //       <Route path='posts/:id/comments' element={<PostIdPage />} />
                :
                <>
                    {publicRoutes.map(r =>
                        <Route key={r.path} path={r.path} element={r.element}/>)}
                    <Route path='/*' element={<Login />}/>
                </>}
        </Routes>
    )
}
