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
                <li><a href="">بحث</a></li>
            </ul>

        </div>
    );
}

export default Navbar;