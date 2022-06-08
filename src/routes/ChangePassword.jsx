import React, { useContext, useState, useEffect } from "react"
import ErrorIcon from "@mui/icons-material/Error"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
	let navigate = useNavigate()
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

	useEffect(() => {
		setValidData({
			newPassword: PWD_REGEX.test(userData.newPassword),
			passwordConfirm: userData.newPassword === userData.passwordConfirm
		})
	}, [userData])

	function handleChange(e) {
		let { name, value } = e.target
		setUserData((prevUserData) => ({ ...prevUserData, [name]: value }))
	}
	async function handleSubmit(e) {
		e.preventDefault()
		if (Object.values(validData).some((value) => !value)) return
		let finalData = { ...userData }
		delete finalData.passwordConfirm
		try {
			const response = await api.post("/change-password", finalData, {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			navigate(-1)
		} catch (err) {
			console.error(err)
		}
	}
	console.log(userData)
	console.log(validData)

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
				يجب أن يتكون الرقم السري من 8 إلى 24 حرف، منهم على الأقل حرف علوى واحد،
				حرف سفلي واحد، رقم واحد، وعلامة من العلامات !@#$%.
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
				كلمة السر غير مطابقة.
			</p>
			<button className="main-button" style={{ alignSelf: "center" }}>
				تأكيد
			</button>
		</form>
	)
}

export default ChangePassword
