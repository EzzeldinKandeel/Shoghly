import React from 'react'
import Footer from '../components/footer'
import MainContent from '../components/MainContent'
import Navbar from '../components/navbar'

function HomeScreen() {
	return (
		<div className='container'>
			<Navbar />
			<MainContent />
			<Footer />
		</div>
	)
}

export default HomeScreen
