import React, {useContext, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../../context/context";
import {MyButton} from "../button/MyButton";

export const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const n = useNavigate()

    const logout = () => {
        setIsAuth(false)
        n('/login')
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>
                Exit
            </MyButton>
            <div className='navbar__links'>
                <Link to='/about' style={{marginRight: '6px'}}>about</Link>
                <Link to='/posts' style={{marginRight: '6px'}}>posts</Link>
            </div>
        </div>
    )
}
