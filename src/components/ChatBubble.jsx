import React from "react"

function ChatBubble(props) {
	return (
		<div className={`chat-bubble chat-bubble-${props.position}`}>
			<div className="chat-bubble-content">محتوى الرسالة</div>
		</div>
	)
}

export default ChatBubble
