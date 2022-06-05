import React, { useContext } from "react"
import "../styles/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import logo_placeholder from "../images/placeholder_50px_50px.png"
import AuthContext from "../context/AuthProvider"
import LogoutIcon from "@mui/icons-material/Logout"
import SettingsIcon from "@mui/icons-material/Settings"

function Navbar() {
	const navigate = useNavigate()
	const { auth, setAuth } = useContext(AuthContext)

	return (
		<div className="navbar">
			<Link to="/" className="logo">
				<img src={logo_placeholder} alt="logo" className="logo-image" />
			</Link>
			<h1 className="app-name">
				<Link to="/">شغلي</Link>
			</h1>

			<ul className="navbar--items">
				<li>
					<Link to="/">الصفحة الرئيسية</Link>
				</li>
				<li>
					<Link to="/professions">الحرف</Link>
				</li>
				{auth && (
					<li>
						<Link to="/favorites">المفضلات</Link>
					</li>
				)}
				{/* {user && (
					<li>
						<Link to="/conversations">المحادثات</Link>
					</li>
				)} */}
				{auth?.role === "worker" && (
					<li>
						<Link to="/reviews">التقييمات</Link>
					</li>
				)}

				{/* <li>
					<Link to="/about">عن الموقع</Link>
				</li> */}
			</ul>
			{auth ? (
				<ul className="account-management">
					<li>
						<Link to="/settings" className="align-icon">
							<SettingsIcon />
							الإعدادات
						</Link>
					</li>
					<li
						className="align-icon"
						onClick={() => {
							setAuth(null)
							navigate("/")
						}}
					>
						<LogoutIcon />
						تسجيل الخروج
					</li>
				</ul>
			) : (
				<ul className="account-management">
					<li>
						<Link to="/sign-in">تسجيل الدخول</Link>
					</li>
					<li>
						<Link to="/sign-up">إنشاء حساب جديد</Link>
					</li>
				</ul>
			)}
		</div>
	)
}

export default Navbar
