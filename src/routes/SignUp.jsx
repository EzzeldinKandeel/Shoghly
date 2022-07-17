import React, { useContext, useState, useEffect, useRef } from "react"
import { getCities, getProfessions } from "../data"
import "../styles/signup.css"
import { Navigate, useNavigate } from "react-router-dom"
import { HashLink as Link } from "react-router-hash-link"

import api from "../api/axios"
import ErrorBackdrop from "../components/ErrorBackdrop"
import AuthContext from "../context/AuthProvider"

function SignUp() {
	document.title = "إنشاء حساب جديد - شغلي"
	let navigate = useNavigate()
	const { auth } = useContext(AuthContext)

	const cities = getCities()
	const professions = getProfessions()
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
	const MOB_REGEX = /^01[0125][0-9]{8}$/
	const currentDate = new Date()
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const emailRef = useRef()
	const phoneRef = useRef()
	const ageRef = useRef()
	const genderRef = useRef()
	const cityRef = useRef()
	const roleRef = useRef()
	const professionRef = useRef()

	let years = (() => {
		let arr = []
		for (let i = 1900; i <= currentDate.getFullYear(); i++) arr.push(i)
		return arr
	})()
	let months = (() => {
		let arr = []
		for (let i = 1; i <= 12; i++) arr.push(i)
		return arr
	})()
	const generateDays = (month, year) => {
		let arr = []
		let lastDay = 30
		if (["0", "2", "4", "6", "7", "9", "11"].includes(month)) lastDay = 31
		else if (year % 4 === 0 && month === "1") lastDay = 29
		else if (month === "1") lastDay = 28
		for (let i = 1; i <= lastDay; i++) arr.push(i)
		return arr
	}

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
		day: currentDate.getDate(),
		month: currentDate.getMonth(),
		year: currentDate.getFullYear()
	})
	const [validInput, setValidInput] = useState({
		firstName: true,
		lastName: true,
		password: true,
		passwordConfirm: true,
		email: true,
		emailUnique: true,
		phone: true,
		phoneUnique: true,
		age: true,
		gender: true,
		city: true,
		role: true,
		profession: true
	})
	const [days, setDays] = useState([])
	const [error, setError] = useState(false)

	useEffect(() => {
		setDays(generateDays(signUpData.month, signUpData.year))
	}, [signUpData.month, signUpData.year])

	function checkAge() {
		let applicantBD = new Date(
			signUpData.year,
			signUpData.month,
			signUpData.day
		)
		let dayDate = currentDate.getTime()
		applicantBD = applicantBD.getTime()

		return dayDate - applicantBD >= 568024668000
	}

	function handleChange(event) {
		const { name, value, type, checked } = event.target
		setSignUpData((prevSignUpData) => {
			return {
				...prevSignUpData,
				[name]: value
			}
		})
		if (signUpData.role !== "worker") {
			setValidInput((prev) => ({ ...prev, profession: true }))
			setSignUpData((prev) => ({ ...prev, profession: "" }))
		}
		if (type === "radio") {
			setValidInput((prev) => ({ ...prev, [name]: true }))
		}
	}

	function handleBlur(event) {
		const { name, value } = event.target
		if (value === "") {
			setValidInput((prev) => ({ ...prev, [name]: false }))
		} else if (name === "password") {
			setValidInput((prev) => ({
				...prev,
				password: PWD_REGEX.test(signUpData.password)
			}))
		} else if (name === "passwordConfirm") {
			setValidInput((prev) => ({
				...prev,
				passwordConfirm: signUpData.password === signUpData.passwordConfirm
			}))
		} else if (name === "phone") {
			setValidInput((prev) => ({
				...prev,
				phone: MOB_REGEX.test(signUpData.phone),
				phoneUnique: true
			}))
		} else if (name === "email") {
			setValidInput((prev) => ({ ...prev, email: true, emailUnique: true }))
		}
		{
			setValidInput((prev) => ({ ...prev, [name]: true }))
		}
	}

	async function handleSubmit(event) {
		event.preventDefault()
		if (!validInput.firstName) {
			firstNameRef.current.focus()
			return
		} else if (!validInput.lastName) {
			lastNameRef.current.focus()
			return
		} else if (!validInput.password) {
			passwordRef.current.focus()
			return
		} else if (!validInput.passwordConfirm) {
			passwordConfirmRef.current.focus()
			return
		} else if (!validInput.email) {
			emailRef.current.focus()
			return
		} else if (!validInput.phone) {
			phoneRef.current.focus()
			return
		} else if (!checkAge()) {
			setValidInput((prev) => ({ ...prev, age: false }))
			ageRef.current.focus()
			return
		} else {
			setValidInput((prev) => ({ ...prev, age: true }))
		}
		if (signUpData.gender === "") {
			setValidInput((prev) => ({ ...prev, gender: false }))
			genderRef.current.focus()
			return
		} else {
			setValidInput((prev) => ({ ...prev, gender: true }))
		}
		if (signUpData.city === "") {
			setValidInput((prev) => ({ ...prev, city: false }))
			cityRef.current.focus()
			return
		} else {
			setValidInput((prev) => ({ ...prev, city: true }))
		}
		if (signUpData.role === "") {
			setValidInput((prev) => ({ ...prev, role: false }))
			roleRef.current.focus()
			return
		} else {
			setValidInput((prev) => ({ ...prev, role: true }))
		}
		if (signUpData.role === "worker" && signUpData.profession === "") {
			setValidInput((prev) => ({ ...prev, profession: false }))
			professionRef.current.focus()
			return
		} else {
			setValidInput((prev) => ({ ...prev, profession: true }))
		}
		let finalSignUpData = { ...signUpData }

		if (finalSignUpData.role === "client") {
			delete finalSignUpData.profession
		}
		delete finalSignUpData.day
		delete finalSignUpData.month
		delete finalSignUpData.year
		delete finalSignUpData.passwordConfirm

		try {
			await api.post("/users", finalSignUpData)
			navigate("/sign-in")
		} catch (err) {
			let notUniqueErrorMsg = err.response.data.error.errors[0].message
			if (notUniqueErrorMsg === "email must be unique") {
				setValidInput((prev) => ({ ...prev, emailUnique: false }))
				emailRef.current.focus()
			} else if (notUniqueErrorMsg === "phone must be unique") {
				setValidInput((prev) => ({ ...prev, phoneUnique: false }))
				phoneRef.current.focus()
			} else {
				setError(true)
			}
		}
	}
	console.log(signUpData)

	return auth ? (
		<Navigate to="/" replace={true} />
	) : (
		<div className="sign-up-page">
			<ErrorBackdrop open={error} close={() => setError(false)} />
			<div className="sign-up-content">
				<div className="sign-up-heading">
					<h1 className="sign-up-brand-name">
						<Link to="/#">شــــغــــلــــي</Link>
					</h1>
					<p className="sign-up-title">إنشاء حساب جديد</p>
				</div>
				<form onSubmit={handleSubmit} className="sign-up-form">
					<div
						className={validInput.firstName ? "" : "sign-up-input-invalid"}
						data-error-msg="برجاء إدخال بيانات صحيحة"
					>
						<input
							name="firstName"
							placeholder="الاسم الأول"
							value={signUpData.firstName}
							onChange={handleChange}
							onBlur={handleBlur}
							type="text"
							className="sign-up-input sign-up-firstName"
							ref={firstNameRef}
						/>
					</div>
					<div
						className={validInput.lastName ? "" : "sign-up-input-invalid"}
						data-error-msg="برجاء إدخال بيانات صحيحة"
					>
						<input
							name="lastName"
							placeholder="الاسم الأخير"
							value={signUpData.lastName}
							onChange={handleChange}
							onBlur={handleBlur}
							type="text"
							className="sign-up-input sign-up-lastName"
							ref={lastNameRef}
						/>
					</div>
					<div
						className={validInput.password ? "" : "sign-up-input-invalid"}
						data-error-msg="يجب أن تتكون كلمة المرور من 8 إلى 24 حرف أو رقم أو رمز"
					>
						<input
							name="password"
							placeholder="أدخل كلمة مرور آمنة"
							value={signUpData.password}
							onChange={handleChange}
							onBlur={handleBlur}
							type="password"
							className="sign-up-input sign-up-password"
							ref={passwordRef}
						/>
					</div>
					<div
						className={
							validInput.passwordConfirm ? "" : "sign-up-input-invalid"
						}
						data-error-msg="كلمة المرور غير مطابقة"
					>
						<input
							name="passwordConfirm"
							placeholder="أعد إدخال كلمة المرور"
							value={signUpData.passwordConfirm}
							onChange={handleChange}
							onBlur={handleBlur}
							type="password"
							className="sign-up-input sign-up-passwordConfirm"
							ref={passwordConfirmRef}
						/>
					</div>
					<div
						className={
							validInput.email && validInput.emailUnique
								? ""
								: "sign-up-input-invalid"
						}
						data-error-msg={
							!validInput.email
								? "برجاء إدخال عنوان بريد إلكتروني صحيح"
								: !validInput.emailUnique
								? "تم استخدام هذا البريد الإلكتروني من قبل"
								: ""
						}
					>
						<input
							name="email"
							placeholder="عنوان البريد الإلكتروني"
							value={signUpData.email}
							onChange={handleChange}
							onBlur={handleBlur}
							type="email"
							className="sign-up-input sign-up-email"
							ref={emailRef}
						/>
					</div>
					<div
						className={
							validInput.phone && validInput.phoneUnique
								? ""
								: "sign-up-input-invalid"
						}
						data-error-msg={
							!validInput.phone
								? "برجاء إدخال رقم هاتف صحيح"
								: !validInput.phoneUnique
								? "تم استخدام هذا الرقم من قبل"
								: ""
						}
					>
						<input
							name="phone"
							placeholder="رقم الهاتف المحمول"
							value={signUpData.phone}
							onChange={handleChange}
							onBlur={handleBlur}
							type="tel"
							className="sign-up-input sign-up-phone"
							ref={phoneRef}
						/>
					</div>
					<div className="date-picker">
						<span className="sign-up-input-label">تاريخ الميلاد</span>
						<div
							ref={ageRef}
							className={`date-picker-content ${
								validInput.age ? "" : "sign-up-input-invalid"
							}`}
							data-error-msg="لا يسمح بالتسجيل لمن هم دون 18 عام"
						>
							<select
								name="day"
								className="sign-up-input"
								value={signUpData.day}
								onChange={handleChange}
							>
								{days.map((day) => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</select>
							<select
								name="month"
								className="sign-up-input"
								value={signUpData.month}
								onChange={handleChange}
							>
								{months.map((month) => (
									<option key={month} value={month - 1}>
										{month}
									</option>
								))}
							</select>
							<select
								name="year"
								className="sign-up-input"
								value={signUpData.year}
								onChange={handleChange}
							>
								{years.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					</div>
					<div
						className={`sign-up-radio-group ${
							validInput.gender ? "" : "sign-up-input-invalid"
						}`}
						ref={genderRef}
						data-error-msg="برجاء الاختيار"
					>
						<input
							type="radio"
							name="gender"
							onChange={handleChange}
							id="ذكر"
							value="ذكر"
							checked={signUpData.gender === "ذكر"}
							className="display-none"
						/>
						<label htmlFor="ذكر" className="sign-up-radio-label">
							ذكر
						</label>
						<input
							type="radio"
							name="gender"
							onChange={handleChange}
							id="أنثى"
							value="أنثى"
							checked={signUpData.gender === "أنثى"}
							className="display-none"
						/>
						<label htmlFor="أنثى" className="sign-up-radio-label">
							أنثى
						</label>
					</div>
					<div
						className={validInput.city ? "" : "sign-up-input-invalid"}
						data-error-msg="برجاء الاختيار"
					>
						<select
							name="city"
							value={signUpData.city}
							onChange={handleChange}
							className="sign-up-input sign-up-city"
							ref={cityRef}
						>
							<option disabled value="">
								-- إختر محافظة --
							</option>
							{cities.map((city) => (
								<option key={cities.indexOf(city)} value={city}>
									{city}
								</option>
							))}
						</select>
					</div>
					<div>
						<input
							name="line"
							placeholder="العنوان"
							value={signUpData.line}
							onChange={handleChange}
							className="sign-up-input sign-up-line"
						/>
					</div>
					<div
						className={`sign-up-radio-group ${
							validInput.role ? "" : "sign-up-input-invalid"
						}`}
						ref={roleRef}
						data-error-msg="برجاء الاختيار"
					>
						<input
							type="radio"
							name="role"
							onChange={handleChange}
							id="client"
							value="client"
							checked={signUpData.role === "client"}
							className="display-none"
						/>
						<label htmlFor="client" className="sign-up-radio-label">
							عميل
						</label>
						<input
							type="radio"
							name="role"
							onChange={handleChange}
							id="worker"
							value="worker"
							checked={signUpData.role === "worker"}
							className="display-none"
						/>
						<label htmlFor="worker" className="sign-up-radio-label">
							حرفي
						</label>
					</div>
					{signUpData.role === "worker" && (
						<div
							className={validInput.profession ? "" : "sign-up-input-invalid"}
							data-error-msg="برجاء الاختيار"
						>
							<select
								name="profession"
								value={signUpData.profession}
								onChange={handleChange}
								className="sign-up-input sign-up-profession"
								ref={professionRef}
							>
								<option disabled value="">
									-- إختر حرفة --
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
					<button className="sign-up-button">إنشاء حساب</button>
				</form>
				<div className="sign-up-additional-links">
					<span>
						لديك حساب بالفعل؟{" "}
						<Link to="/sign-in/#" className="sign-in-additional-link">
							تسجيل الدخول
						</Link>
					</span>
				</div>
			</div>
		</div>
	)
}

export default SignUp
