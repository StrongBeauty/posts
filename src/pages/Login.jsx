import React, {useContext} from 'react';
import {MyInput} from "../components/UI/input/MyInput";
import {MyButton} from "../components/UI/button/MyButton";
import {AuthContext} from "../context/context";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const n = useNavigate()

    const login = (e) => {
        e.preventDefault()
        setIsAuth(true)
        n('/posts')
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Login'/>
                <MyInput type='password' placeholder='Password'/>
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );}
