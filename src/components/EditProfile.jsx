import React from "react"
import UserContext from "../context/UserProvider"
import api from "../api/axios"
import { getCities } from "./../data"
import ErrorIcon from "@mui/icons-material/Error"

function EditProfile() {
	const MOB_REGEX = /^[0-9]{11}$/

	const cities = getCities()
	const { user, setUser } = React.useContext(UserContext)
	const [edit, setEdit] = React.useState({
		firstName: false,
		lastName: false,
		gender: false,
		profession: false,
		phone: false,
		city: false,
		line: false,
		profilePictureUrl: false
	})
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
	const [isEmpty, setIsEmpty] = React.useState(false)
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
			{edit[id] ? "إلغاء" : "تعديل"}
		</button>
	)
	React.useEffect(() => {
		if (!edit.phone) {
			setPhoneIsValid(true)
		}
		for (let property in edit) {
			if (!edit[property]) {
				setUpdatedUser((prevUpdatedUser) => ({
					...prevUpdatedUser,
					[property]: ""
				}))
			}
		}
	}, [edit])
	React.useEffect(async () => {
		try {
			const professionsResponse = await api.get("/professions")
			setProfessions(professionsResponse.data)
		} catch (err) {
			console.error(err.message)
		}
	}, [])

	function handleChange(event) {
		setIsEmpty(false)
		const { name, value } = event.target
		setUpdatedUser((prevUpdatedUser) => {
			return {
				...prevUpdatedUser,
				[name]: value
			}
		})
	}

	function handleSubmit(event) {
		event.preventDefault()
		let finalUpdatedUser = { ...updatedUser }
		for (let property in finalUpdatedUser) {
			if (finalUpdatedUser[property] === "") {
				delete finalUpdatedUser[property]
			}
		}
		if (finalUpdatedUser.phone) {
			setPhoneIsValid(MOB_REGEX.test(finalUpdatedUser.phone))
		}
		if (Object.keys(finalUpdatedUser).length === 0) {
			setIsEmpty(true)
		}
		console.log(finalUpdatedUser)
	}
	console.log(updatedUser)

	return (
		<div className="form">
			<form onSubmit={handleSubmit}>
				<div className="data-container">
					<label>الاسم الأول: </label>
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
						<p className="edit-profile--user-data">{user.firstName}</p>
					)}
					{editToggle("firstName")}
				</div>
				<div className="data-container">
					<label>الاسم الأخير: </label>
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
						<p className="edit-profile--user-data">{user.lastName}</p>
					)}
					{editToggle("lastName")}
				</div>
				<div className="data-container">
					<label>الجنس: </label>
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
							<option value="male">ذكر</option>
							<option value="female">أنثى</option>
						</select>
					) : (
						<p className="edit-profile--user-data">
							{user.gender === "male" ? "ذكر" : "أنثى"}
						</p>
					)}
					{editToggle("gender")}
				</div>
				<div className="data-container">
					<label>المحافظة: </label>
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
								<option key={city} value={city}>
									{city}
								</option>
							))}
						</select>
					) : (
						<p className="edit-profile--user-data">{user.city}</p>
					)}
					{editToggle("city")}
				</div>
				<div className="data-container">
					<label>رقم المحمول: </label>
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
						<p className="edit-profile--user-data">{user.phone}</p>
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
				{user.role === "worker" && (
					<div className="data-container">
						<label>الحرفة: </label>
						{edit.profession ? (
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
						) : (
							<p className="edit-profile--user-data">{user.profession}</p>
						)}
						{editToggle("profession")}
					</div>
				)}
				{user.role === "worker" && (
					<div className="data-container">
						<label>العنوان: </label>
						{edit.line ? (
							<input
								type="text"
								name="line"
								value={updatedUser.line}
								onChange={handleChange}
								className="input-box"
							/>
						) : (
							<p className="edit-profile--user-data">{user.line}</p>
						)}
						{editToggle("line")}
					</div>
				)}
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
		</div>
	)
}

export default EditProfile
