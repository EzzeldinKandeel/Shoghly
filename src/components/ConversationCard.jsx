import React from "react"
import { Link } from "react-router-dom"
import avatar from "../images/avatar.png"

function ConversationCard() {
	return (
		<div className="conversation-card">
			<Link to="/" className="conversation-card-content">
				<img
					src={avatar}
					height="50"
					width="50"
					className="image-cover background-multiply"
				/>
				<div className="conversation-card-text">
					<h3>المراسل</h3>
					<span>أخر رسالة</span>
				</div>
			</Link>
		</div>
	)
}

export default ConversationCard
