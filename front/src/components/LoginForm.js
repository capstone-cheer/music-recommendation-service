import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import { IoPersonCircleOutline, IoKey } from "react-icons/io5";
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
            sessionStorage.setItem('member_id', res.data.memberId);//res.data.member_id);
            sessionStorage.setItem('user_id', loginId)
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
        <div className="login__form">
            <div className="login__container">
                <div className="input__container">
                    <div className="id__input__container">
                        <div className="id__input__icon">
                            <IoPersonCircleOutline size='36' color="white" />
                        </div>
                        <div className="id__input">
                            <input id="id" 
                                type="text"
                                name="id" 
                                placeholder="아이디를 입력하세요." 
                                value={loginId} 
                                onChange={handleInputId} />
                        </div>
                    </div>
                    <div className="password__input__container">
                        <div className="password__input__icon">
                            <IoKey size='36' color="white" />
                        </div>
                        <div className="password__input">
                            <input id="password" 
                                type="password" 
                                name="password" 
                                placeholder="비밀번호를 입력하세요." 
                                value={password} 
                                onChange={handleInputPassword} />
                        </div>
                    </div>
                    <button onClick={submit}>로그인</button>
                </div>
                    
                    <div className="signup__button">
                        <Link to="/signup"> 회원가입 </Link>
                    </div>
            </div>
        </div>
    );
}
export default LoginForm;