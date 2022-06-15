import React, { useContext, useState, useEffect } from "react"
import "../styles/login.css"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function EmailVerification() {
	let navigate = useNavigate()

	const [verifyEmailData, setVerifyEmailData] = useState({
		email: "",
		code: ""
	})
	const [isInvalid, setIsInvalid] = useState(false)

	function handleChange(event) {
		const { name, value } = event.target
		console.log(event.target)
		setVerifyEmailData((prevVerifyEmailData) => {
			return {
				...prevVerifyEmailData,
				[name]: value
			}
		})
	}

	async function handleSubmit(event) {
		event.preventDefault()
		try {
			const verifyResponse = await api.post("/verify/email", verifyEmailData)
			navigate("/")
		} catch (error) {
			setIsInvalid(true)
		}
	}

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
						البريد الإلكتروني أو الكود غير صحيح
					</p>
				)}
				<div className="input-container">
					<label>البريد الإلكتروني</label>
					<input
						type="email"
						name="email"
						onChange={handleChange}
						value={verifyEmailData.email}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>الكود</label>
					<input
						type="text"
						name="text"
						onChange={handleChange}
						defaultValue={verifyEmailData.code}
						className="input-box"
						required
					/>
				</div>
				<input
					type="submit"
					value="تأكيد"
					style={{ alignSelf: "center" }}
					className="main-button"
				/>
			</form>
		</div>
	)
}

export default EmailVerification
