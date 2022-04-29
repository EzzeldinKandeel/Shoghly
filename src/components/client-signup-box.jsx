import React from 'react'
import '../styles/signup.css'
import '../styles/login.css'
import { Link } from 'react-router-dom'
import { getData } from './../data'

function ClientSignupBox() {
	const data = getData()
	const MOB_REGEX = /^[0-9]{11}$/
	const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

	const [signupData, setSignupData] = React.useState({
		firstName: '',
		lastName: '',
		email: '',
		city: '',
		mobileNumber: '',
		birthDate: '',
		password: '',
		passwordConfirm: '',
	})
	const [validSignupData, setValidSignupData] = React.useState({
		mobileNumber: true,
		password: true,
		passwordConfirm: true,
	})

	function handleChange(event) {
		const { name, value } = event.target
		setSignupData((prevSignupData) => {
			return {
				...prevSignupData,
				[name]: value,
			}
		})
	}

	function handleSubmit(event) {
		event.preventDefault()
		setValidSignupData({
			mobileNumber: MOB_REGEX.test(signupData.mobileNumber),
			password: PWD_REGEX.test(signupData.password),
			passwordConfirm: signupData.password === signupData.passwordConfirm,
		})
		console.log(signupData)
		console.log(validSignupData)
	}

	return (
		<div className='form'>
			<form onSubmit={handleSubmit}>
				<div className='input-container'>
					<label>الاسم الأول: </label>
					<div className='input-box-container'>
						<input
							type='text'
							name='firstName'
							value={signupData.firstName}
							onChange={handleChange}
							className='input-box'
							required
						/>
					</div>
				</div>
				<div className='input-container'>
					<label>الاسم الأخير: </label>
					<div className='input-box-container'>
						<input
							type='text'
							name='lastName'
							value={signupData.lastName}
							onChange={handleChange}
							className='input-box'
							required
						/>
					</div>
				</div>
				<div className='input-container'>
					<label>البريد الإلكتروني: </label>
					<div className='input-box-container'>
						<input
							type='email'
							name='email'
							value={signupData.email}
							onChange={handleChange}
							className='input-box'
							required
						/>
					</div>
				</div>
				<div className='input-container'>
					<label>المحافظة: </label>
					<div className='input-box-container'>
						<select
							name='city'
							value={signupData.city}
							onChange={handleChange}
							className='input-box'
							required
						>
							<option value=''>-- إختر --</option>
							{data.cities.map((city) => (
								<option value={city}>{city}</option>
							))}
						</select>
					</div>
				</div>
				<div className='input-container'>
					<label>رقم المحمول: </label>
					<div className='input-box-container'>
						<input
							type='tel'
							name='mobileNumber'
							value={signupData.mobileNumber}
							onChange={handleChange}
							className='input-box'
							required
						/>
						<p
							className='input-error'
							style={{ display: validSignupData.mobileNumber ? 'none' : '' }}
						>
							برجاء إدخال رقم محمول صحيح (11 رقم).
						</p>
					</div>
				</div>
				<div className='input-container'>
					<label>تاريخ الميلاد: </label>
					<div className='input-box-container'>
						<input
							type='date'
							name='birthDate'
							value={signupData.birthDate}
							onChange={handleChange}
							className='input-box'
							required
						/>
					</div>
				</div>
				<div className='input-container'>
					<label>الرقم السري: </label>
					<div className='input-box-container'>
						<input
							type='password'
							name='password'
							value={signupData.password}
							onChange={handleChange}
							className='input-box'
							required
						/>
					</div>
				</div>
				<div className='input-container'>
					<label>تأكيد على الرقم السري: </label>
					<div className='input-box-container'>
						<input
							type='password'
							name='passwordConfirm'
							value={signupData.passwordConfirm}
							onChange={handleChange}
							className='input-box'
							required
						/>
					</div>
				</div>
				<div className='button-container multiple-horizontal-buttons'>
					<input
						type='submit'
						value='تسجيل'
						className='main-button signup-submit'
					/>
					<Link to='/' className='main-button signup-cancel'>
						إلغاء
					</Link>
				</div>
			</form>
		</div>
	)
}

export default ClientSignupBox
