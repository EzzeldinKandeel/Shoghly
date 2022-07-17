import React from "react"
import avatar from "../images/avatar.png"
import { HashLink as Link } from "react-router-hash-link"

function ConversationCard(props) {
	let conversation = props.conversation
	return (
		<div
			className={`conversation-card ${
				props.selected && "conversation-selected"
			}`}
		>
			<Link
				to={`/conversations/${conversation.user.id}/#`}
				className="conversation-card-content"
			>
				<img
					src={conversation.user.picture || avatar}
					height="50"
					width="50"
					className="image-cover"
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
