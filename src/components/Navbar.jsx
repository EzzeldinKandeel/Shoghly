import React, { useContext, useState, useEffect } from "react"
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
import api from "../api/axios"
import avatar from "../images/avatar.png"

function Navbar() {
	const navigate = useNavigate()
	const { auth, setAuth } = useContext(AuthContext)
	const [user, setUser] = useState(null)
	const [panelOpen, setPanelOpen] = useState(false)

	useEffect(() => {
		if (panelOpen) {
			document.body.addEventListener("click", () => setPanelOpen(false), {
				once: true
			})
		}
	}, [panelOpen])
	useEffect(async () => {
		if (auth) {
			try {
				const userResponse = await api.get("/users", {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
				setUser(userResponse.data.data)
			} catch (err) {
				console.error(err)
			}
		}
	}, [auth])

	return (
		<div className="navbar">
			<h1 className="app-name">
				<Link to="/#">
					<span>شــــغــــلــــي</span>
				</Link>
			</h1>

			<ul
				className={`navbar--items ${
					auth ? "navbar--items-user" : "navbar--items-guest"
				}`}
			>
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
				{auth && user ? (
					<>
						<button
							className="navbar-user-button"
							onClick={() => setPanelOpen((prev) => !prev)}
						>
							<img
								src={user.picture || avatar}
								className="image-cover navbar-user-pic"
								width="35"
								height="35"
							/>
						</button>
						<div
							onClick={() => setPanelOpen(false)}
							className="navbar-user-panel"
							style={{ display: panelOpen ? "flex" : "none" }}
						>
							<span>{`أهلا، ${user.firstName}!`}</span>
							<Link
								to="/settings/#"
								className="align-icon navbar-user-panel-link"
							>
								<SettingsIcon />
								<span>الإعدادات</span>
							</Link>
							<button
								className="align-icon sign-out-button"
								onClick={() => {
									setAuth(null)
									localStorage.removeItem("shoghlyAppAuth")
									navigate("/")
								}}
							>
								<LogoutIcon />
								<span>تسجيل الخروج</span>
							</button>
						</div>
					</>
				) : (
					// <>
					// 	<li>
					// 		<Link to="/settings/#" className="align-icon">
					// 			<SettingsIcon />
					// 			<span>الإعدادات</span>
					// 		</Link>
					// 	</li>
					// 	<li
					// 		className="align-icon"
					// 		onClick={() => {
					// 			setAuth(null)
					// 			localStorage.removeItem("shoghlyAppAuth")
					// 			navigate("/")
					// 		}}
					// 	>
					// 		<LogoutIcon />
					// 		<span>تسجيل الخروج</span>
					// 	</li>
					// </>
					<>
						<li style={{ marginInlineStart: "auto" }}>
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
