import React, { useEffect, useState, useContext, useRef } from "react"
import api from "../api/axios"
import { getCities } from "../data"
import ErrorIcon from "@mui/icons-material/Error"
import AuthContext from "../context/AuthProvider"
import EditIcon from "@mui/icons-material/Edit"
import CancelIcon from "@mui/icons-material/Cancel"
import userPlaceHolderPic from "../images/placeholder_50px_50px.png"

function EditProfile() {
	const MOB_REGEX = /^[0-9]{11}$/
	let imageData = new FormData()
	const imageRef = useRef(null)

	const cities = getCities()
	const { auth } = useContext(AuthContext)
	const [userData, setUserData] = useState({})
	const [phoneIsValid, setPhoneIsValid] = useState(true)
	useEffect(async () => {
		try {
			const getProfileResponse = await api.get(`/profile/${auth.id}`)
			setUserData(getProfileResponse.data.info)
		} catch (err) {
			console.error(err)
		}
	}, [])
	useEffect(() => {
		setPhoneIsValid(MOB_REGEX.test(userData.phone))
	}, [userData.phone])

	function handleChange(event) {
		const { name, value } = event.target
		setUserData((prevUserData) => {
			return {
				...prevUserData,
				[name]: value
			}
		})
	}

	async function handleSubmit(event) {
		event.preventDefault()
		if (!phoneIsValid) return
		if (imageRef?.current.files.length > 0) {
			imageData.append("photos", imageRef.current.files[0])
			try {
				const imageUploadResponse = await api.post("/upload", imageData, {
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${auth.token}`
					}
				})
				const imageChangeResponse = await api.post(
					`/profile/${auth.id}/changePicture`,
					{ picture: imageUploadResponse.data.data[0].url },
					{ headers: { Authorization: `Bearer ${auth.token}` } }
				)
			} catch (err) {
				console.error(err.message)
			}
		}
		let finaluserData = { ...userData }
		console.log(finaluserData)
		try {
			const response = await api.put("/profile", finaluserData, {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			console.log(response)
		} catch (err) {
			console.error(err)
		}
	}
	useEffect(() => {
		console.log(imageData)
	}, [imageData])

	return (
		<form className="full-page-form" onSubmit={handleSubmit}>
			<div className="data-container">
				<label>الصورة الشخصية</label>
				<img src={userData.picture || userPlaceHolderPic} />
				<input
					ref={imageRef}
					type="file"
					name="picture"
					// onChange={(e) => {
					// 	console.log(e.target.files)
					// 	imageData.append("photos", e.target.files[0])
					// }}
				/>
			</div>
			<div className="data-container">
				<label>الاسم الأول </label>
				<input
					type="text"
					name="firstName"
					value={userData.firstName}
					onChange={handleChange}
					className="input-box"
					required
				/>
			</div>
			<div className="data-container">
				<label>الاسم الأخير </label>
				<input
					type="text"
					name="lastName"
					value={userData.lastName}
					onChange={handleChange}
					className="input-box"
					required
				/>
			</div>
			<div className="data-container">
				<label>الجنس </label>
				<select
					name="gender"
					value={userData.gender}
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
			</div>
			<div className="data-container">
				<label>المحافظة </label>
				<select
					name="city"
					value={userData.city}
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
			<div className="data-container">
				<label>رقم المحمول </label>
				<input
					type="tel"
					name="phone"
					value={userData.phone}
					onChange={handleChange}
					className="input-box"
					required
				/>
				<p
					className="input-error"
					style={{
						display: phoneIsValid ? "none" : ""
					}}
				>
					برجاء إدخال رقم محمول صحيح (11 رقم).
				</p>
			</div>
			<div className="data-container">
				<label>العنوان </label>
				<input
					type="text"
					name="line"
					value={userData.line}
					onChange={handleChange}
					className="input-box"
				/>
			</div>
			<button className="main-button" style={{ alignSelf: "center" }}>
				تأكيد
			</button>
			{/* <p
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
				</p> */}
		</form>
	)
}

export default EditProfile
