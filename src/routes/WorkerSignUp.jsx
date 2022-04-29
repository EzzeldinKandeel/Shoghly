import React from 'react'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import WorkerSignupBox from '../components/worker-signup-box'

function WorkerSignUp() {
	return (
		<div className='container'>
			<Navbar />
			<WorkerSignupBox />
			<Footer />
		</div>
	)
}

export default WorkerSignUp
