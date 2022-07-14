import React, { useContext, useState, useEffect } from "react"
import "../styles/SignIn.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import signInBackground from "../images/sign-in-background.jpg"

function SignIn() {
	document.title = "تسجيل الدخول - شغلي"
	let navigate = useNavigate()

	const { auth, setAuth } = useContext(AuthContext)
	const [userInput, setUserInput] = useState({ email: "", password: "" })
	const [isInvalid, setIsInvalid] = useState(false)

	function handleChange(event) {
		const { name, value } = event.target
		setUserInput((prevUserInput) => {
			return {
				...prevUserInput,
				[name]: value
			}
		})
	}

	async function handleSubmit(event) {
		event.preventDefault()
		try {
			const signInResponse = await api.post("/signin", userInput)
			const getUserDataResponse = await api.get("/users", {
				headers: { Authorization: `Bearer ${signInResponse.data.accessToken}` }
			})
			setAuth({
				token: signInResponse.data.accessToken,
				id: signInResponse.data.userId,
				role: getUserDataResponse.data.data.role
			})
			navigate(-1)
		} catch (error) {
			setIsInvalid(true)
		}
	}

	useEffect(() => {
		localStorage.setItem("shoghlyAppAuth", JSON.stringify(auth))
	}, [auth])

	return auth ? (
		<Navigate to="/" replace={true} />
	) : (
		<div
			className="sign-in-page"
			// style={{ backgroundImage: `url(${signInBackground})` }}
		>
			<div className={`sign-in-content ${isInvalid ? "sign-in-invalid" : ""}`}>
				<div className="sign-in-heading">
					<h1 className="sign-in-brand-name">
						<Link to="/">شــــغــــلــــي</Link>
					</h1>
					<h2 className="sign-in-title">تسجيل الدخول</h2>
				</div>
				<div
					className="sign-in-invalid-message"
					style={{ display: isInvalid ? "" : "none" }}
				>
					<span>البريد الإلكتروني أو كلمة المرور غير صحيحة</span>
				</div>
				<form onSubmit={handleSubmit} className="sign-in-form">
					<input
						type="text"
						className="sign-in-input"
						placeholder="أدخل عنوان البريد الإلكتروني"
						onChange={handleChange}
						name="email"
						value={userInput.email}
					/>
					<input
						type="password"
						className="sign-in-input"
						placeholder="أدخل كلمة المرور"
						onChange={handleChange}
						name="password"
						value={userInput.password}
					/>
					<span style={{ height: "fit-content", textIndent: "0.2rem" }}>
						<Link to="/reset-password" className="sign-in-additional-link">
							هل نسيت كلمة المرور؟
						</Link>
					</span>
					<button className="sign-in-button">تسجيل</button>
				</form>
				<div className="sign-in-additional-links">
					<span>
						ليس لديك حساب؟{" "}
						<Link to="/sign-up" className="sign-in-additional-link">
							إنشاء حساب جديد
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default SignIn
