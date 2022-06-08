import React, { useContext, useState } from "react"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ErrorIcon from "@mui/icons-material/Error"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"

function ChangePassword() {
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
	const { auth } = useContext(AuthContext)
	const [userData, setUserData] = useState({
		oldPassword: "",
		newPassword: "",
		passwordConfirm: ""
	})
	const [validData, setValidData] = useState({
		newPassword: true,
		passwordConfirm: true
	})

	function handleChange(e) {
		let { name, value } = e.target
	}
	async function handleSubmit(e) {
		e.preventDefault()
	}

	return (
			<form onSubmit={handleSubmit} className="account-settings-window">
				<div className="input-container">
					<label>كلمة السر القديمة</label>
					<input
						type="password"
						name="oldPassword"
						className="input-box"
						onChange={handleChange}
					/>
				</div>
				<div className="input-container">
					<label>كلمة السر الجديدة</label>
					<input
						type="password"
						name="newPassword"
						className="input-box"
						onChange={handleChange}
					/>
				</div>
				<p
					className="input-error"
					style={{ display: validData.newPassword ? "none" : "" }}
				>
					يجب أن يتكون الرقم السري من 8 إلى 24 حرف، منهم على الأقل حرف علوى
					واحد، حرف سفلي واحد، رقم واحد، وعلامة من العلامات !@#$%.
				</p>
				<div className="input-container">
					<label>تأكيد على كلمة السر</label>
					<input
						type="password"
						name="passwordConfirm"
						className="input-box"
						onChange={handleChange}
					/>
				</div>
				<p
					className="input-error"
					style={{
						display: validData.passwordConfirm ? "none" : ""
					}}
				>
					كلة السر غير مطابقة.
				</p>
				<button className="main-button" style={{alignSelf: "center"}}>تأكيد</button>
			</form>
	)
}

export default ChangePassword
