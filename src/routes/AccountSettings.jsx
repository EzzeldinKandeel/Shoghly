import React from "react"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import UserContext from "../context/UserProvider"
import ErrorIcon from "@mui/icons-material/Error"
import api from "../api/axios"

function AccountSettings() {
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

	const { user, setUser } = React.useContext(UserContext)
	const [isSelected, setIsSelected] = React.useState({
		changeEmail: false,
		changePassword: false
	})
	const [isEmpty, setIsEmpty] = React.useState(false)
	const [newData, setNewData] = React.useState({
		email: "",
		password: "",
		passwordConfirm: ""
	})
	const [validData, setValidData] = React.useState({
		password: true,
		passwordConfirm: true
	})
	let used = Object.values(isSelected).some((element) => element) ? "used" : ""

	function handleSelect(e) {
		let buttonId = e.target.id
		if (isSelected[buttonId]) return
		setIsEmpty(false)
		for (let property in isSelected) {
			setIsSelected((prevIsSelected) => ({
				...prevIsSelected,
				[property]: property == buttonId ? true : false
			}))
		}
		for (let field in newData) {
			setNewData((prevNewData) => ({ ...prevNewData, [field]: "" }))
		}
		for (let field in validData) {
			setValidData((prevValidData) => ({ ...prevValidData, [field]: true }))
		}
	}
	function handleChange(e) {
		const { name, value } = e.target
		setIsEmpty(false)
		setNewData((prevNewData) => ({ ...prevNewData, [name]: value }))
	}
	async function handleSubmit(e) {
		e.preventDefault()
		if (isSelected.changePassword) {
			let validityChecks = {
				password: PWD_REGEX.test(newData.password),
				passwordConfirm: newData.password === newData.passwordConfirm
			}
			setValidData(validityChecks)
			if (!Object.values(validityChecks).every((value) => value)) return
		}
		let finalData = { ...newData }
		delete finalData.passwordConfirm
		for (let property in finalData) {
			if (finalData[property] === "") {
				delete finalData[property]
			}
		}
		if (Object.keys(finalData).length === 0) {
			setIsEmpty(true)
			return
		}
		try {
			const response = await api.patch(`/users/${user.id}`, finalData)
			setUser(response.data)
		} catch (err) {
			console.error(err)
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
				<form onSubmit={handleSubmit} className="account-settings-window">
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
					{isEmpty && (
						<p
							style={{
								fontSize: "0.9em",
								display: "flex",
								gap: "4px",
								alignSelf: "center",
								color: "var(--red)",
								textAlign: "center",
								margin: "0px"
							}}
						>
							<ErrorIcon fontSize="small" sx={{ color: "var(--red)" }} />
							لم يتم إدخال تعديلات
						</p>
					)}
				</form>
			)}
			{isSelected.changePassword && (
				<form onSubmit={handleSubmit} className="account-settings-window">
					<div className="input-container">
						<label>الرقم السري</label>
						<input
							type="password"
							name="password"
							className="input-box"
							onChange={handleChange}
						/>
					</div>
					<p
						className="input-error"
						style={{ display: validData.password ? "none" : "" }}
					>
						يجب أن يتكون الرقم السري من 8 إلى 24 حرف، منهم على الأقل حرف علوى
						واحد، حرف سفلي واحد، رقم واحد، وعلامة من العلامات !@#$%.
					</p>
					<div className="input-container">
						<label>تأكيد على الرقم السري</label>
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
						الرقم السري غير مطابق.
					</p>
					<button className="main-button">تأكيد</button>
				</form>
			)}
		</div>
	)
}

export default AccountSettings
