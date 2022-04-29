import React from 'react'
import '../styles/MainContent.css'
import Card from './card'

function MainContent() {
	return (
		<div className='main-content'>
			<section className='main-section' id='hero'></section>
			<section className='main-section' id='most-popular'>
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</section>
			<section className='main-section' id='recent-additions'></section>
			<section className='main-section' id='popular-professions'></section>
		</div>
	)
}

export default MainContent
