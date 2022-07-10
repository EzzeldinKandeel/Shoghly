import React from "react"
import { Link } from "react-router-dom"
import avatar from "../images/avatar.png"

function ConversationCard(props) {
	let conversation = props.conversation
	return (
		<div className="conversation-card">
			<Link
				to={`/conversations/${conversation.user.id}`}
				className="conversation-card-content"
			>
				<img
					src={conversation.user.picture || avatar}
					height="50"
					width="50"
					className="image-cover background-multiply"
				/>
				<div className="conversation-card-text">
					<h3>
						{conversation.user.firstName} {conversation.user.lastName}
					</h3>
					<span>{conversation.lastMessage}</span>
				</div>
			</Link>
		</div>
	)
}

export default ConversationCard
