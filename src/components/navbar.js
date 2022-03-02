import React from "react";
import logo_placeholder from '../images/logo-placeholder.png';

function Navbar() {
    return (
        <div className="navbar">
            <a href="../../public/index.html" className="logo"><img src={logo_placeholder} alt="logo" className="logo-image"/></a>
            <h1 className="app-name"><a href="../../public/index.html">اسم الموقع</a></h1>

            <ul className="navbar--items">
                <li><a href="">الصفحة الرئيسية</a></li>
                <li><a href="">الأشهر</a></li>
                <li><a href="">الأقسام</a></li>
                <li><a href="">عن الموقع</a></li>
            </ul>

            <input type="search" name="global-search" placeholder="بحث" className="global-search" />

            <div className="account-management">
                <a href="" id="sign-in">تسجيل الدخول</a>
                <a href="" id="sign-up">إنشاء حساب جديد</a>
            </div>
        </div>
    );
}

export default Navbar;