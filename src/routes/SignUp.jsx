import React from "react"
import Navbar from "./../components/navbar"
import Footer from "./../components/footer"
import SignUpForm from "../components/SignUpForm"

function SignUp() {
	return (
		<div className="container">
			<Navbar />
			<SignUpForm />
			<Footer />
		</div>
	)
}

export default SignUp
