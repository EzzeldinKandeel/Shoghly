import React from "react"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import UserContext from "../context/UserProvider"

function AccountSettings() {
	const { user, setUser } = React.useContext(UserContext)
	const [isSelected, setIsSelected] = React.useState({
		changeEmail: false,
		changePassword: false
	})
	const [newData, setNewData] = React.useState({
		email: "",
		password: "",
		confirmPassword: ""
	})
	const [validData, setValidData] = React.useState({
		password: true,
		passwordConfirm: true
	})
	let used = Object.values(isSelected).some((element) => element) ? "used" : ""

	function handleSelect(e) {
		let buttonId = e.target.id
		if (isSelected[buttonId]) return
		for (let property in isSelected) {
			setIsSelected((prevIsSelected) => ({
				...prevIsSelected,
				[property]: property == buttonId ? true : false
			}))
		}
		for (let field in newData) {
			setNewData((prevNewData) => ({ ...prevNewData, [field]: "" }))
		}
	}
	function handleChange(e) {
		const { name, value } = e.target
		setNewData((prevNewData) => ({ ...prevNewData, [name]: value }))
	}
	async function handleSubmit(e) {
		e.preventDefault()
		let validityChecks = {
			password: PWD_REGEX.test(newData.password),
			passwordConfirm: newData.password === newData.passwordConfirm
		}
		setValidData(validityChecks)
		if (Object.values(validityChecks).every((value) => value)) {
			let finalData = {...newData}
			for (let property in finalData) {
				if (finalData[property] === "") {
					delete finalData[property]
				}
			}
		}
	}

	return (
		<div className="account-settings">
			<div className={`settings ${used}`}>
				<button
					id="changeEmail"
					onClick={handleSelect}
					className={`settings-section account-settings-section ${
						isSelected.changeEmail ? "selected" : ""
					}`}
				>
					تغيير البريد الإلكتروني
					<ArrowBackIosNewIcon fontSize="small" />
				</button>
				<button
					id="changePassword"
					onClick={handleSelect}
					className={`settings-section account-settings-section ${
						isSelected.changePassword ? "selected" : ""
					}`}
				>
					تغيير الرقم السري
					<ArrowBackIosNewIcon fontSize="small" />
				</button>
			</div>
			{isSelected.changeEmail && (
				<form className="account-settings-window">
					<div className="input-container">
						<label>البريد الإلكتروني الحالي</label>
						<p className="edit-profile--user-data">{user.email}</p>
					</div>
					<div className="input-container">
						<label>البريد الإلكتروني الجديد</label>
						<input
							type="email"
							name="email"
							className="input-box"
							onChange={handleChange}
						/>
					</div>
					<button className="main-button">تأكيد</button>
				</form>
			)}
			{isSelected.changePassword && (
				<form className="account-settings-window">
					<div className="input-container">
						<label>الرقم السري</label>
						<input
							type="passworkd"
							name="passwordConfirm"
							className="input-box"
							onChange={handleChange}
						/>
						<p
							className="input-error"
							style={{ display: validData.password ? "none" : "" }}
						>
							يجب أن يتكون الرقم السري من 8 إلى 24 حرف، منهم على الأقل حرف علوى
							واحد، حرف سفلي واحد، رقم واحد، وعلامة من العلامات !@#$%.
						</p>
					</div>
					<div className="input-container">
						<label>تأكيد على الرقم السري</label>
						<input
							type="passworkd"
							name="password"
							className="input-box"
							onChange={handleChange}
						/>
						<p
							className="input-error"
							style={{
								display: validData.passwordConfirm ? "none" : ""
							}}
						>
							الرقم السري غير مطابق.
						</p>
					</div>
					<button className="main-button">تأكيد</button>
				</form>
			)}
		</div>
	)
}

export default AccountSettings
