import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/account-type.css'

function AccountTypeBox() {
	return (
		<div className='account-type-choice'>
			<div className='prompt'>
				<p>اختر نوع الحساب</p>
			</div>
			<div className='choices'>
				<Link to='/signup-as-a-worker' className='account-type-card'>
					حرفي
				</Link>
				<Link to='/signup-as-a-client' className='account-type-card'>
					عميل
				</Link>
			</div>
		</div>
	)
}

export default AccountTypeBox
