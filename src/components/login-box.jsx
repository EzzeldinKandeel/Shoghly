import React, { useContext, useState, useEffect } from "react"
import "../styles/login.css"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"

function LoginBox() {
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
			const getProfileResponse = await api.get(
				`/profile/${signInResponse.data.userId}`
			)
			setAuth({
				token: signInResponse.data.accessToken,
				id: signInResponse.data.userId,
				role: getProfileResponse.data.info.role
			})
			navigate("/")
		} catch (error) {
			setIsInvalid(true)
		}
	}

	useEffect(() => {
		console.log(auth)
	}, [auth])

	return (
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

export default LoginBox
