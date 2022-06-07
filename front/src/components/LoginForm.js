import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import '../css/LoginForm.css';

// Login > LoginForm
function LoginForm(props) {
    const [loginId, setLoginId] = useState('')
    const [password, setPassword] = useState('')

    const handleInputId = (e) => {
        setLoginId(e.target.value)
    }
    const handleInputPassword = (e) => {
        setPassword(e.target.value)
    }

    const postLogin = async (loginId, password) => {
        await axios.post("/login", {
            loginId: loginId,
            password: password
        }).then(function (res) {
            console.log(res)
            sessionStorage.setItem('member_id', "1");//res.data.member_id);
            sessionStorage.setItem('user_id', loginId);
            window.location.replace("/");
        }).catch(function (error) {
            console.log('err', error);
            alert('잘못된 아이디 또는 비밀번호입니다.')
        });
    }

    const submit = () => {
        postLogin(loginId, password);
    }

    return (
        <div className="LoginForm">
            <div className="LoginContainer">
                <input id="id" 
                    type="text"
                    name="id" 
                    placeholder="아이디를 입력하세요." 
                    value={loginId} 
                    onChange={handleInputId} />
                <input id="password" 
                    type="password" 
                    name="password" 
                    placeholder="비밀번호를 입력하세요." 
                    value={password} 
                    onChange={handleInputPassword} />
                <button onClick={submit}>로그인</button>
                <Link to="/signup"> 회원가입 </Link>
            </div>
        </div>
    );
}
export default LoginForm;