import React from "react"
import "../styles/login.css"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"
import UserContext from "../context/UserProvider"

function LoginBox() {
	let navigate = useNavigate()

	const { setUser } = React.useContext(UserContext)
	const [loginData, setLoginData] = React.useState({ email: "", password: "" })

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
			const response = await api.get("/users", { params: loginData })
			setUser(response.data[0])
			navigate("/")
		} catch (error) {
			console.log(`Error: ${error.message}`)
		}
	}

	return (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<label>البريد الإلكتروني: </label>
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
					<label>الرقم السري: </label>
					<input
						type="password"
						name="password"
						onChange={handleChange}
						value={loginData.password}
						className="input-box"
						required
					/>
				</div>
				<div className="button-container">
					<input
						type="submit"
						value="دخول"
						style={{ width: "100%" }}
						className="main-button"
					/>
				</div>
			</form>
			<p style={{ textAlign: "center" }}>
				ليس لديك حساب؟{" "}
				<Link to="/sign-up" style={{ color: "var(--red)" }}>
					إنشاء حساب جديد
				</Link>
			</p>
		</div>
	)
}

export default LoginBox
