import React, { useState } from "react"
import { getCities, getProfessions } from "../data"
import "../styles/signup.css"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/axios"

function SignUp() {
	let navigate = useNavigate()

	const cities = getCities()
	const professions = getProfessions()
	const MOB_REGEX = /^[0-9]{11}$/
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

	const [signUpData, setSignUpData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordConfirm: "",
		gender: "",
		role: "",
		profession: "",
		phone: "",
		country: "مصر",
		city: "",
		line: "",
		birthDate: ""
	})
	const [validSignUpData, setValidSignUpData] = useState({
		phone: true,
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
		setSignUpData((prevSignUpData) => {
			return {
				...prevSignUpData,
				[name]: value
			}
		})
	}

	async function handleSubmit(event) {
		event.preventDefault()
		let validityChecks = {
			phone: MOB_REGEX.test(signUpData.phone),
			password: PWD_REGEX.test(signUpData.password),
			passwordConfirm: signUpData.password === signUpData.passwordConfirm,
			age: checkAge(signUpData.birthDate)
		}
		setValidSignUpData(validityChecks)

		if (Object.values(validityChecks).some((value) => !value)) return
		let finalSignUpData = { ...signUpData }

		if (finalSignUpData.role === "client") {
			delete finalSignUpData.profession
		}
		delete finalSignUpData.birthDate
		delete finalSignUpData.passwordConfirm

		try {
			const response1 = await api.post("/signup", finalSignUpData)
			navigate("/login")
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<label>الاسم الأول</label>
					<input
						type="text"
						name="firstName"
						value={signUpData.firstName}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>الاسم الأخير</label>
					<input
						type="text"
						name="lastName"
						value={signUpData.lastName}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>البريد الإلكتروني</label>
					<input
						type="email"
						name="email"
						value={signUpData.email}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>كلمة المرور</label>
					<input
						type="password"
						name="password"
						value={signUpData.password}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<p
					className="input-error"
					style={{ display: validSignUpData.password ? "none" : "" }}
				>
					يجب أن تتكون كلمة المرور من 8 إلى 24 حرف، منهم على الأقل حرف علوى
					واحد، حرف سفلي واحد، رقم واحد، وعلامة من العلامات !@#$%.
				</p>
				<div className="input-container">
					<label>أعد إدخال كلمة المرور</label>
					<input
						type="password"
						name="passwordConfirm"
						value={signUpData.passwordConfirm}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<p
					className="input-error"
					style={{
						display: validSignUpData.passwordConfirm ? "none" : ""
					}}
				>
					كلمة المرور غير مطابقة.
				</p>
				<div className="input-container">
					<label>تاريخ الميلاد</label>
					<input
						type="date"
						name="birthDate"
						value={signUpData.birthDate}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<p
					className="input-error"
					style={{ display: validSignUpData.age ? "none" : "" }}
				>
					لا يسمح بالتسجيل لمن هم دون 18 عام.
				</p>
				<div className="input-container">
					<label>الجنس</label>
					<select
						name="gender"
						value={signUpData.gender}
						onChange={handleChange}
						className="input-box"
						required
					>
						<option disabled value="">
							-- إختر --
						</option>
						<option value="male">ذكر</option>
						<option value="female">أنثى</option>
					</select>
				</div>
				<div className="input-container">
					<label>المحافظة</label>
					<select
						name="city"
						value={signUpData.city}
						onChange={handleChange}
						className="input-box"
						required
					>
						<option disabled value="">
							-- إختر --
						</option>
						{cities.map((city) => (
							<option key={cities.indexOf(city)} value={city}>
								{city}
							</option>
						))}
					</select>
				</div>
				<div className="input-container">
					<label>رقم المحمول</label>
					<input
						type="tel"
						name="phone"
						value={signUpData.phone}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<p
					className="input-error"
					style={{ display: validSignUpData.phone ? "none" : "" }}
				>
					برجاء إدخال رقم محمول صحيح (11 رقم).
				</p>
				<div className="input-container">
					<label>العنوان</label>
					<input
						type="text"
						name="line"
						value={signUpData.line}
						onChange={handleChange}
						className="input-box"
					/>
				</div>
				<div className="input-container">
					<label>نوع الحساب</label>
					<select
						name="role"
						value={signUpData.role}
						onChange={handleChange}
						className="input-box"
						required
					>
						<option disabled value="">
							-- إختر --
						</option>
						<option value="client">عميل</option>
						<option value="worker">حرفي</option>
					</select>
				</div>
				{signUpData.role === "worker" && (
					<div className="input-container">
						<label>الحرفة</label>
						<select
							name="profession"
							value={signUpData.profession}
							onChange={handleChange}
							className="input-box"
							required
						>
							<option disabled value="">
								-- إختر --
							</option>
							{professions.map((profession) => (
								<option
									key={professions.indexOf(profession)}
									value={profession}
								>
									{profession}
								</option>
							))}
						</select>
					</div>
				)}
				<div className="multiple-horizontal-buttons">
					<button type="submit" className="main-button">
						تسجيل
					</button>
					<button
						type="button"
						className="secondary-button"
						onClick={() => navigate("/")}
					>
						إلغاء
					</button>
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

export default SignUp
