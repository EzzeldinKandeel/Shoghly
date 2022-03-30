import React from 'react';
import LoginBox from '../components/login-box';
import Navbar from '../components/navbar';

function Login() {
    return (
        <div className='container'>
            <Navbar />
            <LoginBox />
        </div>
    )
}

export default Login