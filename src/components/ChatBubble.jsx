import React from "react"

function ChatBubble(props) {
	return (
		<div className={`chat-bubble chat-bubble-${props.position}`}>
			<div className="chat-bubble-content">
				<span>{props.messageContent}</span>
			</div>
		</div>
	)
}

export default ChatBubble
