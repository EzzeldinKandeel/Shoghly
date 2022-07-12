import React, { useState, useEffect, useContext } from "react"
import SendMessage from "../components/SendMessage"
import "../styles/Chat.css"
import ChatBubble from "./../components/ChatBubble"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"

function Chat() {
	let params = useParams()
	const { auth } = useContext(AuthContext)
	const [messages, setMessages] = useState([])
	useEffect(async () => {
		try {
			const messagesResponse = await api.get(
				`/users/${params.correspondentId}/messages`,
				{ headers: { Authorization: `Bearer ${auth.token}` } }
			)
			setMessages(messagesResponse.data.data)
		} catch (err) {
			console.error(err)
		}
	}, [])
	return (
		<div className="chat chat-container">
			<div className="messages-view">
				{messages.map((message) => (
					<ChatBubble
						position={message.isOwner ? "right" : "left"}
						messageContent={message.text}
						key={message.messageId}
					/>
				))}
			</div>
			<SendMessage />
		</div>
	)
}

export default Chat
