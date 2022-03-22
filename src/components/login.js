import React from "react";

function Login() {
    return (
        <div className="form">
            <form>
                <div className="input-container">
                    <label>البريد الإلكتروني: </label>
                    <input type="email" name="email" className="login-box" required />
                </div>
                <div className="input-container">
                    <label>الرقم السري: </label>
                    <input type="password" name="pass" className="login-box" required />
                </div>
                <div className="button-container">
                    <input type="submit" value="دخول" className="login-button"/>
                </div>
            </form>
        </div>
    );
}

export default Login;