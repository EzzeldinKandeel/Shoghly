import React from "react";
import "../styles/signup.css"
import "../styles/login.css"
import {Link} from 'react-router-dom'

function ClientSignupBox() {
    return (
        <div className="form">
            <form>
                <div className="input-container">
                    <label>الاسم الأول: </label>
                    <input type="text" name="first-name" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>الاسم الأخير: </label>
                    <input type="text" name="last-name" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>البريد الإلكتروني: </label>
                    <input type="email" name="email" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>المحافظة: </label>
                    <input type="text" name="city" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>رقم المحمول: </label>
                    <input type="tel" name="mobile-number" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>تاريخ الميلاد: </label>
                    <input type="date" name="profession" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>الرقم السري: </label>
                    <input type="password" name="password" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>تأكيد على الرقم السري: </label>
                    <input type="password" name="password-repeat" className="input-box" required />
                </div>
                <div className="button-container multiple-horizontal-buttons">
                    <input type="submit" value="تسجيل" className="main-button signup-submit"/>
                    <Link to='/' className="main-button signup-cancel">إلغاء</Link>
                </div>
            </form>
        </div>
    );
}

export default ClientSignupBox;