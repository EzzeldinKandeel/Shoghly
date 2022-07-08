import React from "react"
import ConversationCard from "../components/ConversationCard"
import SendMessage from "../components/SendMessage"
import "../styles/Chat.css"
import ChatBubble from "./../components/ChatBubble"

function Chat() {
	return (
		<div
			className="chat"
			style={{
				margin: "auto",
				display: "flex",
				flexDirection: "column",
				gap: "1rem"
			}}
		>
			<ChatBubble position={"right"} />
			<SendMessage />
			<ConversationCard />
		</div>
	)
}

export default Chat
