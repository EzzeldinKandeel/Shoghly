import React from "react";
import "../styles/login.css"

function LoginBox() {
    return (
        <div className="form">
            <form>
                <div className="input-container">
                    <label>البريد الإلكتروني: </label>
                    <input type="email" name="email" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>الرقم السري: </label>
                    <input type="password" name="password" className="input-box" required />
                </div>
                <div className="button-container">
                    <input type="submit" value="دخول" className="main-button"/>
                </div>
            </form>
        </div>
    );
}

export default LoginBox;