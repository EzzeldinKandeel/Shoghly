import React, { useContext, useState, useEffect } from "react"
import "../styles/SignIn.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import signInBackground from "../images/sign-in-background.jpg"

function SignIn() {
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
					<button className="sign-in-button">تسجيل</button>
				</form>
				<div className="sign-in-additional-links">
					<span>
						ليس لديك حساب؟{" "}
						<Link to="/sign-up" className="sign-in-additional-link">
							إنشاء حساب جديد
						</Link>
					</span>
					<span>
						<Link to="/reset-password" className="sign-in-additional-link">
							إعادة ضبط كلمة المرور
						</Link>
					</span>
				</div>
			</div>
			{/* <img src={signInBackground} /> */}
			{/* <form onSubmit={handleSubmit}>
				{isInvalid && (
					<p
						style={{
							alignSelf: "center",
							fontSize: "0.9rem",
							color: "var(--clr-accent-400)"
						}}
					>
						البريد الإلكتروني أو الرقم السرى غير صحيح
					</p>
				)}
				<div className="input-container">
					<label>البريد الإلكتروني</label>
					<input
						type="email"
						name="email"
						onChange={handleChange}
						value={loginData.email}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>كلمة المرور</label>
					<input
						type="password"
						name="password"
						onChange={handleChange}
						value={loginData.password}
						className="input-box"
						required
					/>
				</div>
				<input
					type="submit"
					value="دخول"
					style={{ alignSelf: "center" }}
					className="main-button"
				/>
			</form>
			<p style={{ textAlign: "center" }}>
				ليس لديك حساب؟{" "}
				<Link to="/sign-up" style={{ color: "var(--clr-accent-400)" }}>
					إنشاء حساب جديد
				</Link>
			</p>
			<p style={{ textAlign: "center", marginTop: "0px" }}>
				<Link to="/reset-password" style={{ color: "var(--clr-accent-400)" }}>
					إعادة ضبط كلمة المرور
				</Link>
			</p> */}
		</div>
	)
}

export default SignIn
