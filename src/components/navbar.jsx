import React from "react";
import "../styles/navbar.css"
import { Link } from "react-router-dom";
import logo_placeholder from '../images/placeholder_50px_50px.png';

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="logo">
                <img src={logo_placeholder} alt="logo" className="logo-image"/>
            </Link>
            <h1 className="app-name"><Link to="/">شغلي</Link></h1>

            <ul className="navbar--items">
                <li><Link to="/">الصفحة الرئيسية</Link></li>
                <li><Link to="">الأشهر</Link></li>
                <li><Link to="/professions">الحرف</Link></li>
                <li><Link to="">عن الموقع</Link></li>
            </ul>

            <input type="search" name="global-search" placeholder="بحث" className="global-search" />

            <div className="account-management">
                <Link to="/login">تسجيل الدخول</Link>
                <Link to="/choose-account-type">إنشاء حساب جديد</Link>
            </div>
        </div>
    );
}

export default Navbar;