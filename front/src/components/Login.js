import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUp from './SignUp'

// App > Login
function Login(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm />} exact={true}></Route>
                <Route path="/signup" element={<SignUp />} exact={true}></Route>
            </Routes>
        </div>
    );
}
export default Login;