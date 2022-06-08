import React, { useEffect, useState, useContext, useRef } from "react"
import api from "../api/axios"
import { getCities } from "../data"
import ErrorIcon from "@mui/icons-material/Error"
import AuthContext from "../context/AuthProvider"
import EditIcon from "@mui/icons-material/Edit"
import CancelIcon from "@mui/icons-material/Cancel"

function EditProfile() {
	const MOB_REGEX = /^01[0125][0-9]{8}$/
	let imageData = new FormData()
	const imageRef = useRef(null)

	const cities = getCities()
	const { auth } = useContext(AuthContext)
	const [currentUser, setCurrentUser] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		phone: "",
		city: "",
		line: ""
	})
	const [edit, setEdit] = useState({
		firstName: false,
		lastName: false,
		gender: false,
		phone: false,
		city: false,
		line: false,
		profilePictureUrl: false
	})
	const [updatedUser, setUpdatedUser] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		phone: "",
		city: "",
		line: "",
		country: "مصر"
	})
	const [phoneIsValid, setPhoneIsValid] = useState(true)
	const [isEmpty, setIsEmpty] = useState(false)
	const editToggle = (id) => (
		<button
			className="edit-toggle"
			type="button"
			onClick={() => {
				setEdit((prevEdit) => ({
					...prevEdit,
					[id]: !prevEdit[id]
				}))
			}}
			id={id}
		>
			{edit[id] ? <CancelIcon /> : <EditIcon />}
		</button>
	)
	useEffect(async () => {
		try {
			const getProfileResponse = await api.get(`/profile/${auth.id}`)
			setCurrentUser(getProfileResponse.data.info)
		} catch (err) {
			console.error(err)
		}
	}, [])
	useEffect(() => {
		if (!edit.phone) {
			setPhoneIsValid(true)
		}
		// if (!edit.profilePictureUrl) {
		// 	imageData = new FormData()
		// }
		for (let property in edit) {
			if (!edit[property]) {
				setUpdatedUser((prevUpdatedUser) => ({
					...prevUpdatedUser,
					[property]: ""
				}))
			}
		}
	}, [edit])

	function handleChange(event) {
		const { name, value } = event.target
		if (name === "phone") setPhoneIsValid(true)
		setIsEmpty(false)
		setUpdatedUser((prevUpdatedUser) => {
			return {
				...prevUpdatedUser,
				[name]: value
			}
		})
	}

	async function handleSubmit(event) {
		event.preventDefault()
		// if (imageRef && imageRef.current.files.length != 0) {
		// 	try {
		// 		const imageResponse = await imageApi.post("", imageData, {
		// 			headers: {
		// 				"Content-Type": "multipart/form-data"
		// 			}
		// 		})
		// 		console.log(imageResponse)
		// 	} catch (err) {
		// 		console.error(err.message)
		// 	}
		// }
		let finalUpdatedUser = { ...updatedUser }
		let phoneCheck = true
		let emptyCheck = false
		if (Object.values(finalUpdatedUser).every((value) => value === "")) {
			emptyCheck = true
			setIsEmpty(emptyCheck)
			return
		}
		if (finalUpdatedUser.phone) {
			phoneCheck = MOB_REGEX.test(finalUpdatedUser.phone)
			setPhoneIsValid(phoneCheck)
			if (phoneCheck) return
		}
		for (let property in finalUpdatedUser) {
			if (finalUpdatedUser[property] === "") {
				finalUpdatedUser[property] = currentUser[property]
			}
		}
		console.log(finalUpdatedUser)
		try {
			const response = await api.put("/profile", finalUpdatedUser, {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			console.log(response)
		} catch (err) {
			console.error(err)
		}
	}
	console.log(updatedUser)

	return (
		<div className="form">
			<form
				style={{ width: "520px", height: "450px", justifyContent: "center" }}
				onSubmit={handleSubmit}
			>
				{/* <div className="data-container">
					<label>الصورة الشخصية</label>
					{edit.profilePictureUrl && (
						<input
							ref={imageRef}
							type="file"
							name="profilePictureUrl"
							onChange={(e) => {
								imageData.append("image", e.target.files[0])
							}}
						/>
					)}
					{editToggle("profilePictureUrl")}
				</div> */}
				<div className="data-container">
					<label>الاسم الأول </label>
					{edit.firstName ? (
						<input
							type="text"
							name="firstName"
							value={updatedUser.firstName}
							onChange={handleChange}
							className="input-box"
							required
						/>
					) : (
						<p className="edit-profile--user-data">{currentUser.firstName}</p>
					)}
					{editToggle("firstName")}
				</div>
				<div className="data-container">
					<label>الاسم الأخير </label>
					{edit.lastName ? (
						<input
							type="text"
							name="lastName"
							value={updatedUser.lastName}
							onChange={handleChange}
							className="input-box"
							required
						/>
					) : (
						<p className="edit-profile--user-data">{currentUser.lastName}</p>
					)}
					{editToggle("lastName")}
				</div>
				<div className="data-container">
					<label>الجنس </label>
					{edit.gender ? (
						<select
							name="gender"
							value={updatedUser.gender}
							onChange={handleChange}
							className="input-box"
							required
						>
							<option disabled value="">
								-- إختر --
							</option>
							<option value="ذكر">ذكر</option>
							<option value="أنثى">أنثى</option>
						</select>
					) : (
						<p className="edit-profile--user-data">{currentUser.gender}</p>
					)}
					{editToggle("gender")}
				</div>
				<div className="data-container">
					<label>المحافظة </label>
					{edit.city ? (
						<select
							name="city"
							value={updatedUser.city}
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
					) : (
						<p className="edit-profile--user-data">{currentUser.city}</p>
					)}
					{editToggle("city")}
				</div>
				<div className="data-container">
					<label>رقم المحمول </label>
					{edit.phone ? (
						<input
							type="tel"
							name="phone"
							value={updatedUser.phone}
							onChange={handleChange}
							className="input-box"
							required
						/>
					) : (
						<p className="edit-profile--user-data">{currentUser.phone}</p>
					)}
					{editToggle("phone")}
					<p
						className="input-error"
						style={{
							display: edit.phone ? (phoneIsValid ? "none" : "") : "none"
						}}
					>
						برجاء إدخال رقم محمول صحيح (11 رقم).
					</p>
				</div>
				<div className="data-container">
					<label>العنوان </label>
					{edit.line ? (
						<input
							type="text"
							name="line"
							value={updatedUser.line}
							onChange={handleChange}
							className="input-box"
						/>
					) : (
						<p className="edit-profile--user-data">{currentUser.line}</p>
					)}
					{editToggle("line")}
				</div>
				<button className="main-button" style={{ alignSelf: "center" }}>
					تأكيد
				</button>
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
		</div>
	)
}

export default EditProfile
