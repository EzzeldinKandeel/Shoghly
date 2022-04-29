import React from 'react'
import Footer from '../components/footer'
import LoginBox from '../components/login-box'
import Navbar from '../components/navbar'

function Login() {
	return (
		<div className='container'>
			<Navbar />
			<LoginBox />
			<Footer />
		</div>
	)
}

export default Login
