import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/SignUp.css';

const fetchSignUp = async (loginId, password) => {
    
    const response = await axios.post('/members/join', {
        loginId: loginId,
        password: password
    }).then(function (response) {
        console.log('res', response);
        window.location.replace("/");
    }).catch(function (error) {
        console.log('err', error);
    }).then(function (func) {
        console.log('func', func)
    }
    )
    
    // 추후 아이디 중복확인 등 추가    
}

// Login > SignUp
function SignUp(props) {
    const navi = useNavigate();

    const [loginId, setLoginId] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const handleInputId = (e) => {
        setLoginId(e.target.value)
    }
    const handleInputPassword = (e) => {
        setPassword(e.target.value)
    }
    const handleInputPasswordCheck = (e) => {
        setPasswordCheck(e.target.value)
    }

    const submitSignUp = async () => {
        if (password === passwordCheck){
            await fetchSignUp(loginId, password)
        }
        else{
            // 추후 확인 메시지
            console.log("check password")
        }
    }

    return (
        <div className="SignUp">
            <div className="SignUpContainer">
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
                <input id="passwordCheck" 
                    type="password" 
                    name="passwordCheck" 
                    placeholder="비밀번호를 다시 입력하세요." 
                    value={passwordCheck} 
                    onChange={handleInputPasswordCheck} />
                <button onClick={submitSignUp}>회원가입</button>
            </div>
        </div>
    );
}
export default SignUp;