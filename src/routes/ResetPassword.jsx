import React, { useState } from "react"
import api from "../api/axios"
import DoneIcon from "@mui/icons-material/Done"
import ErrorBackdrop from "../components/ErrorBackdrop"

function ResetPassword() {
	const [email, setEmail] = useState("")
	const [sent, setSent] = useState(false)
	const [error, setError] = useState(false)
	const styles = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		marginBlock: "auto",
		width: "min(90%, 400px)"
	}
	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const response = await api.post("/forgotPassword", { email })
			setSent(true)
		} catch (err) {
			setError(ture)
		}
	}
	return (
		<div style={styles}>
			<ErrorBackdrop open={error} close={() => setError(false)} />
			{sent ? (
				<h2
					style={{
						display: "flex",
						alignItems: "center",
						gap: "1rem"
					}}
				>
					<DoneIcon sx={{ color: "var(--gray)" }} />
					تم الإرسال. افحص صندوق البريد الخاص بك
				</h2>
			) : (
				<>
					<p
						style={{
							marginBlockEnd: "2rem",
							textAlign: "center"
						}}
					>
						أدخل عنوان البريد الإلكتروني الذي استخدمته في التسجيل لإرسال رابط
						إعادة الضبط
					</p>
					<form
						onSubmit={handleSubmit}
						style={{
							alignSelf: "center",
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
							alignItems: "center",
							marginBlockEnd: "auto"
						}}
					>
						<input
							type="email"
							className="input-box"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
						<button className="main-button">إرسال</button>
					</form>
				</>
			)}
		</div>
	)
}

export default ResetPassword
