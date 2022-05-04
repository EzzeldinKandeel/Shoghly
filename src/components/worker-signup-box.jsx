import React from "react"
import "../styles/signup.css"
import "../styles/login.css"
import { Link } from "react-router-dom"
import { getData } from "../data"

function WorkerSignupBox() {
	const data = getData()
	const MOB_REGEX = /^[0-9]{11}$/
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

	const [signupData, setSignupData] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		country: "مصر",
		city: "",
		profession: "",
		mobileNumber: "",
		birthDate: "",
		password: "",
		gender: "",
		role: "worker"
	})

	const [passwordConfirm, setPasswordConfirm] = React.useState("")

	const [validSignupData, setValidSignupData] = React.useState({
		mobileNumber: true,
		password: true,
		passwordConfirm: true,
		age: true
	})

	function checkAge(birthDate) {
		let currentDate = new Date()
		let applicantBD = new Date(birthDate)

		currentDate = currentDate.getTime()
		applicantBD = applicantBD.getTime()

		return currentDate - applicantBD >= 568024668000
	}

	function handleChange(event) {
		const { name, value } = event.target
		setSignupData((prevSignupData) => {
			return {
				...prevSignupData,
				[name]: value
			}
		})
	}

	function handleChangePasswordConfirm(event) {
		setPasswordConfirm(event.target.value)
	}

	function handleSubmit(event) {
		event.preventDefault()
		setValidSignupData({
			mobileNumber: MOB_REGEX.test(signupData.mobileNumber),
			password: PWD_REGEX.test(signupData.password),
			passwordConfirm: signupData.password === passwordConfirm,
			age: checkAge(signupData.birthDate)
		})
	}

	return (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<label>الاسم الأول: </label>
					<input
						type="text"
						name="firstName"
						value={signupData.firstName}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>الاسم الأخير: </label>
					<input
						type="text"
						name="lastName"
						value={signupData.lastName}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>البريد الإلكتروني: </label>
					<input
						type="email"
						name="email"
						value={signupData.email}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>المحافظة: </label>
					<select
						name="city"
						value={signupData.city}
						onChange={handleChange}
						className="input-box"
						required
					>
						<option value="">-- إختر --</option>
						{data.cities.map((city) => (
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</div>
				<div className="input-container">
					<label>الحرفة: </label>
					<select
						name="profession"
						value={signupData.profession}
						onChange={handleChange}
						className="input-box"
						required
					>
						<option disabled value="">
							-- إختر --
						</option>
						{data.professions.map((profession) => (
							<option
								key={profession.arabic_name}
								value={profession.arabic_name}
							>
								{profession.arabic_name}
							</option>
						))}
					</select>
				</div>
				<div className="input-container">
					<label>رقم المحمول: </label>
					<input
						type="tel"
						name="mobileNumber"
						value={signupData.mobileNumber}
						onChange={handleChange}
						className="input-box"
						required
					/>
					<p
						className="input-error"
						style={{ display: validSignupData.mobileNumber ? "none" : "" }}
					>
						برجاء إدخال رقم محمول صحيح (11 رقم).
					</p>
				</div>
				<div className="input-container">
					<label>تاريخ الميلاد: </label>
					<input
						type="date"
						name="birthDate"
						value={signupData.birthDate}
						onChange={handleChange}
						className="input-box"
						required
					/>
					<p
						className="input-error"
						style={{ display: validSignupData.age ? "none" : "" }}
					>
						لا يسمح بالتسجيل لمن هم دون 18 عام.
					</p>
				</div>
				<div className="input-container">
					<label>الرقم السري: </label>
					<input
						type="password"
						name="password"
						value={signupData.password}
						onChange={handleChange}
						className="input-box"
						required
					/>
					<p
						className="input-error"
						style={{ display: validSignupData.password ? "none" : "" }}
					>
						يجب أن يتكون الرقم السري من 8 إلى 24 حرف، منهم على الأقل حرف علوى
						واحد، حرف سفلي واحد، رقم واحد، وعلامة من العلامات !@#$%.
					</p>
				</div>
				<div className="input-container">
					<label>تأكيد على الرقم السري: </label>
					<input
						type="password"
						name="passwordConfirm"
						value={passwordConfirm}
						onChange={handleChangePasswordConfirm}
						className="input-box"
						required
					/>
					<p
						className="input-error"
						style={{
							display: validSignupData.passwordConfirm ? "none" : ""
						}}
					>
						الرقم السري غير مطابق.
					</p>
				</div>
				<div className="button-container multiple-horizontal-buttons">
					<input
						type="submit"
						value="تسجيل"
						className="main-button signup-submit"
					/>
					<Link to="/" className="main-button signup-cancel">
						إلغاء
					</Link>
				</div>
			</form>
			<p style={{ textAlign: "center" }}>
				لديك حساب بالفعل؟{" "}
				<Link to="/login" style={{ color: "var(--red)" }}>
					تسجيل الدخول
				</Link>
			</p>
		</div>
	)
}

export default WorkerSignupBox
