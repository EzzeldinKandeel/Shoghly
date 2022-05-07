import React from "react"
import UserContext from "../context/UserProvider"
import api from "../api/axios"
import "../styles/NewReview.css"

function NewReview(props) {
	const { user } = React.useContext(UserContext)

	return <div className="review-box"></div>
}
