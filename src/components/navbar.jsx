import React from "react"
import "../styles/navbar.css"
import { Link, useNavigate } from "react-router-dom"
import logo_placeholder from "../images/placeholder_50px_50px.png"
import UserContext from "../context/UserProvider"

function Navbar() {
	const navigate = useNavigate()

	const { user, setUser } = React.useContext(UserContext)
	console.log(user)

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
				{user && (
					<li>
						<Link to="/favorites">المفضلات</Link>
					</li>
				)}
				{/* {user && (
					<li>
						<Link to="/conversations">المحادثات</Link>
					</li>
				)} */}
				{user && user.role === "worker" && (
					<>
						<li>
							<Link to="/reviews">التعليقات</Link>
						</li>
						<li>
							<Link to="/projects">المعرض</Link>
						</li>
					</>
				)}
			</ul>
			{user ? (
				<ul className="account-management">
					<li>
						<Link to="/settings">الإعدادات</Link>
					</li>
					<li
						onClick={() => {
							setUser(null)
							navigate("/")
						}}
					>
						تسجيل الخروج
					</li>
				</ul>
			) : (
				<ul className="account-management">
					<li>
						<Link to="/login">تسجيل الدخول</Link>
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
