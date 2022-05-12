import React from "react"
import UserContext from "../context/UserProvider"
import api from "../api/axios"
import { getCities } from "./../data"

function EditProfile() {
    const MOB_REGEX = /^[0-9]{11}$/

	const cities = getCities()
	const { user, setUser } = React.useContext(UserContext)
	const [professions, setProfessions] = React.useState([])
	const [updatedUser, setUpdatedUser] = React.useState({
		firstName: "",
		lastName: "",
		gender: "",
		profession: "",
		phone: "",
		city: "",
		line: "",
		profilePictureUrl: ""
	})
    const [phoneIsValid, setPhoneIsValid] = React.useState(true)

	React.useEffect(async () => {
		try {
			const professionsResponse = await api.get("/professions")
			setProfessions(professionsResponse.data)
		} catch (err) {
			console.error(err.message)
		}
	}, [])

	function handleChange(event) {
		const { name, value } = event.target
		setSignUpData((prevSignUpData) => {
			return {
				...prevSignUpData,
				[name]: value
			}
		})
	}

	function handleSubmit(event) {
		event.preventDefault()
	}

	return (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<div className="input-container">
					<label>الاسم الأول: </label>
					<input
						type="text"
						name="firstName"
						value={updatedUser.firstName}
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
						value={updatedUser.lastName}
						onChange={handleChange}
						className="input-box"
						required
					/>
				</div>
				<div className="input-container">
					<label>الجنس: </label>
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
						<option value="male">ذكر</option>
						<option value="female">أنثى</option>
					</select>
				</div>
				<div className="input-container">
					<label>المحافظة: </label>
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
							<option key={city} value={city}>
								{city}
							</option>
						))}
					</select>
				</div>
				<div className="input-container">
					<label>رقم المحمول: </label>
					<input
						type="tel"
						name="phone"
						value={updatedUser.phone}
						onChange={handleChange}
						className="input-box"
						required
					/>
					<p
						className="input-error"
						style={{ display: phoneIsValid ? "none" : "" }}
					>
						برجاء إدخال رقم محمول صحيح (11 رقم).
					</p>
				</div>
				{user.role === "worker" && (
					<div className="input-container">
						<label>الحرفة: </label>
						<select
							name="profession"
							value={updatedUser.profession}
							onChange={handleChange}
							className="input-box"
							required
						>
							<option disabled value="">
								-- إختر --
							</option>
							{professions.map((profession) => (
								<option key={profession} value={profession}>
									{profession}
								</option>
							))}
						</select>
					</div>
				)}
				{user.role === "worker" && (
					<div className="input-container">
						<label>العنوان: </label>
						<input
							type="text"
							name="line"
							value={updatedUser.line}
							onChange={handleChange}
							className="input-box"
						/>
					</div>
				)}
			</form>
		</div>
	)
}

export default EditProfile
