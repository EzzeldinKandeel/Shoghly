import React, { useContext, useState, useEffect } from "react"
import "../styles/login.css"
import { Link, Navigate, useNavigate } from "react-router-dom"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"

function SignIn() {
	let navigate = useNavigate()

	const { auth, setAuth } = useContext(AuthContext)
	const [loginData, setLoginData] = useState({ email: "", password: "" })
	const [isInvalid, setIsInvalid] = useState(false)

	function handleChange(event) {
		const { name, value } = event.target
		setLoginData((prevLoginData) => {
			return {
				...prevLoginData,
				[name]: value
			}
		})
	}

	async function handleSubmit(event) {
		event.preventDefault()
		try {
			const signInResponse = await api.post("/signin", loginData)
			const getUserDataResponse = await api.get("/users", {
				headers: { Authorization: `Bearer ${signInResponse.data.accessToken}` }
			})
			setAuth({
				token: signInResponse.data.accessToken,
				id: signInResponse.data.userId,
				role: getUserDataResponse.data.data.role
			})
			navigate(-1, { replace: true })
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
		<div className="form">
			<form onSubmit={handleSubmit}>
				{isInvalid && (
					<p
						style={{
							alignSelf: "center",
							fontSize: "0.9rem",
							color: "var(--red)"
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
				<Link to="/sign-up" style={{ color: "var(--red)" }}>
					إنشاء حساب جديد
				</Link>
			</p>
			<p style={{ textAlign: "center", marginTop: "0px" }}>
				<Link to="/reset-password" style={{ color: "var(--red)" }}>
					إعادة ضبط كلمة المرور
				</Link>
			</p>
		</div>
	)
}

export default SignIn
