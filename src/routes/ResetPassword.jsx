import React, { useState } from "react"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import api from "../api/axios"
import DoneIcon from "@mui/icons-material/Done"

function ResetPassword() {
	const [email, setEmail] = useState("")
	const [sent, setSent] = useState(false)
	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const response = await api.post("/forgotPassword", { email })
			setSent(true)
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<div className="container">
			<Navbar />
			{sent ? (
				<h2
					style={{
						alignSelf: "center",
						marginBlock: "auto",
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
							marginBlockStart: "auto",
							marginBlockEnd: "2rem",
							alignSelf: "center"
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
			<Footer />
		</div>
	)
}

export default ResetPassword
