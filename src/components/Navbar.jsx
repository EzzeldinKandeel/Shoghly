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
import ChatIcon from "@mui/icons-material/Chat"

function Navbar() {
	const navigate = useNavigate()
	const location = useLocation()
	const { auth, setAuth } = useContext(AuthContext)
	const [user, setUser] = useState(null)
	const [panelOpen, setPanelOpen] = useState(false)

	const colorIfSelected = (path, hash = "") => {
		if (location.pathname.includes(path) && location.hash === hash) {
			return "selected-color"
		}
		return ""
	}

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
					<Link
						to="/#professions"
						className={`align-icon ${colorIfSelected("/", "#professions")}`}
					>
						<WorkIcon className="navbar-icon" />
						<span className="hide-sm">الــخــدمــات</span>
					</Link>
				</li>
				<li>
					<Link to="/#" className="align-icon">
						<SearchIcon className="navbar-icon" />
						<span className="hide-sm">بحث</span>
					</Link>
				</li>
				{auth?.role === "client" && (
					<li>
						<Link
							to="/favorites/#"
							className={`align-icon ${colorIfSelected("/favorites/")}`}
						>
							<BookmarksIcon className="navbar-icon" />
							<span className="hide-sm">المفضلات</span>
						</Link>
					</li>
				)}
				{auth?.role === "worker" && (
					<>
						<li>
							<Link
								to="/reviews/#"
								className={`align-icon ${colorIfSelected("/reviews/")}`}
							>
								<ReviewsIcon className="navbar-icon" />
								<span className="hide-sm">التعليقات</span>
							</Link>
						</li>
						<li>
							<Link
								to="/projects/#"
								className={`align-icon ${colorIfSelected("/projects/")}`}
							>
								<CollectionsIcon className="navbar-icon" />
								<span className="hide-sm">المعرض</span>
							</Link>
						</li>
					</>
				)}
				{auth && (
					<li>
						<Link
							to="/conversations/#"
							className={`align-icon ${colorIfSelected("/conversations/")}`}
						>
							<ChatIcon className="navbar-icon" />
							<span className="hide-sm">المحادثات</span>
						</Link>
					</li>
				)}
				{auth ? (
					<>
						<button
							className="navbar-user-button"
							onClick={() => setPanelOpen((prev) => !prev)}
						>
							<span>{`أهلا${user ? `، ${user.firstName}` : ""}`}</span>
							<img
								src={user?.picture || avatar}
								className="image-cover navbar-user-pic"
								width="25"
								height="25"
							/>
						</button>
						<div
							onClick={() => setPanelOpen(false)}
							className="navbar-user-panel"
							style={{ display: panelOpen ? "flex" : "none" }}
						>
							<span>{`أهلا، ${user?.firstName}`}</span>
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
								<span className="hide-sm">تسجيل الدخول</span>
							</Link>
						</li>
						<li>
							<Link to="/sign-up/#" className="align-icon">
								<AccountBoxIcon />
								<span className="hide-sm">إنشاء حساب جديد</span>
							</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	)
}

export default Navbar
