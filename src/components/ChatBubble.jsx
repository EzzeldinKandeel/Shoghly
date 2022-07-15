import React from "react"
import DateView from "./DateView"

function ChatBubble(props) {
	let message = props.message
	return (
		<div className={`chat-bubble chat-bubble-${props.position}`}>
			<div className="chat-bubble-content">
				<span lang="ar" className="chat-message-text">
					{message.text}
				</span>
				<span className="chat-message-meta">
					<DateView dateCreated={message.createdAt} />
				</span>
			</div>
		</div>
	)
}

export default ChatBubble
