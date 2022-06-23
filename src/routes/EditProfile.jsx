import React, { useEffect, useState, useContext, useRef } from "react"
import api from "../api/axios"
import { getCities } from "../data"
import AuthContext from "../context/AuthProvider"
import avatar from "../images/avatar.png"
import CircularProgress from "@mui/material/CircularProgress"

function EditProfile() {
	const MOB_REGEX = /^01[0125][0-9]{8}$/
	let imageData = new FormData()
	const imageRef = useRef(null)
	const cities = getCities()

	const { auth } = useContext(AuthContext)
	const [userData, setUserData] = useState({})
	const [phoneIsValid, setPhoneIsValid] = useState(true)
	const [getTrigger, setGetTrigger] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(async () => {
		try {
			const getProfileResponse = await api.get("/users", {
				headers: {
					Authorization: `Bearer ${auth.token}`
				}
			})
			setUserData(getProfileResponse.data.data)
		} catch (err) {
			console.error(err)
		}
	}, [getTrigger])
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
		let finaluserData = { ...userData }
		setIsLoading(true)
		if (imageRef?.current.files.length > 0) {
			imageData.append("photos", imageRef.current.files[0])
			try {
				const imageUploadResponse = await api.post("/upload", imageData, {
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${auth.token}`
					}
				})
				finaluserData = {
					...finaluserData,
					picture: imageUploadResponse.data.data[0].url
				}
			} catch (err) {
				console.error(err.message)
			}
		}
		delete finaluserData.id
		delete finaluserData.profession
		delete finaluserData.role
		console.log(finaluserData)
		try {
			await api.put("/users", finaluserData, {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			setGetTrigger((prevGetTrigger) => !prevGetTrigger)
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form className="full-page-form" onSubmit={handleSubmit}>
			<div className="data-container">
				<label>الصورة الشخصية</label>
				<img
					height="50"
					width="50"
					src={userData.picture || avatar}
					className="image-cover"
				/>
				<input ref={imageRef} type="file" name="picture" accept="image/*" />
				<CircularProgress
					color="inherit"
					style={{ display: isLoading ? "" : "none" }}
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
		</form>
	)
}

export default EditProfile
