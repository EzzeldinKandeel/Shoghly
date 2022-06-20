import React, { useContext } from "react"
import "../styles/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import logo_placeholder from "../images/placeholder_50px_50px.png"
import AuthContext from "../context/AuthProvider"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import SettingsIcon from "@mui/icons-material/Settings"
import AccountBoxIcon from "@mui/icons-material/AccountBox"

function Navbar() {
	const navigate = useNavigate()
	const { auth, setAuth } = useContext(AuthContext)

	return (
		<div className="navbar">
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
				{/* {auth && (
					<li>
						<Link to="/favorites">المفضلات</Link>
					</li>
				)} */}
				{/* {user && (
					<li>
						<Link to="/conversations">المحادثات</Link>
					</li>
				)} */}
				{auth?.role === "worker" && (
					<>
						<li>
							<Link to="/reviews">التقييمات</Link>
						</li>
						<li>
							<Link to="/projects">المعرض</Link>
						</li>
					</>
				)}

				{/* <li>
					<Link to="/about">عن الموقع</Link>
				</li> */}
				{auth && (
					<li>
						<Link to="/search">بحث</Link>
					</li>
				)}
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
							localStorage.removeItem("shoghlyAppAuth")
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
						<Link to="/sign-in" className="align-icon">
							<LoginIcon />
							تسجيل الدخول
						</Link>
					</li>
					<li>
						<Link to="/sign-up" className="align-icon">
							<AccountBoxIcon />
							إنشاء حساب جديد
						</Link>
					</li>
				</ul>
			)}
		</div>
	)
}

export default Navbar
