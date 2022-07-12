import React, { useContext } from "react"
import "../styles/navbar.css"
import { useLocation, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import LogoutIcon from "@mui/icons-material/Logout"
import LoginIcon from "@mui/icons-material/Login"
import SettingsIcon from "@mui/icons-material/Settings"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import WorkIcon from "@mui/icons-material/Work"
import ReviewsIcon from "@mui/icons-material/Reviews"
import CollectionsIcon from "@mui/icons-material/Collections"
import SearchIcon from "@mui/icons-material/Search"
import BookmarksIcon from "@mui/icons-material/Bookmarks"
import { HashLink as Link } from "react-router-hash-link"

function Navbar() {
	const navigate = useNavigate()
	const location = useLocation()
	const { auth, setAuth } = useContext(AuthContext)

	return (
		<div className="navbar">
			<h1 className="app-name">
				<Link to="/#">
					<span>شــــغــــلــــي</span>
				</Link>
			</h1>

			<ul className="navbar--items">
				<li>
					<Link to="/#professions" className="align-icon">
						<WorkIcon className="navbar-icon" />
						<span>الــخــدمــات</span>
					</Link>
				</li>
				<li>
					<Link to="/#" className="align-icon">
						<SearchIcon className="navbar-icon" />
						<span>بحث</span>
					</Link>
				</li>
				{auth?.role === "client" && (
					<li>
						<Link to="/favorites/#" className="align-icon">
							<BookmarksIcon className="navbar-icon" />
							<span>المفضلون</span>
						</Link>
					</li>
				)}
				{auth?.role === "worker" && (
					<>
						<li>
							<Link to="/reviews/#" className="align-icon">
								<ReviewsIcon className="navbar-icon" />
								<span>التعليقات</span>
							</Link>
						</li>
						<li>
							<Link to="/projects/#" className="align-icon">
								<CollectionsIcon className="navbar-icon" />
								<span>المعرض</span>
							</Link>
						</li>
					</>
				)}
				{auth ? (
					<>
						<li>
							<Link to="/settings/#" className="align-icon">
								<SettingsIcon />
								<span>الإعدادات</span>
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
							<span>تسجيل الخروج</span>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/sign-in/#" className="align-icon">
								<LoginIcon />
								<span>تسجيل الدخول</span>
							</Link>
						</li>
						<li>
							<Link to="/sign-up/#" className="align-icon">
								<AccountBoxIcon />
								<span>إنشاء حساب جديد</span>
							</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	)
}

export default Navbar
