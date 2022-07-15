import React, { useState, useEffect, useContext } from "react"
import SendMessage from "../components/SendMessage"
import "../styles/Chat.css"
import ChatBubble from "./../components/ChatBubble"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import ConversationCard from "../components/ConversationCard"
import { HashLink as Link } from "react-router-hash-link"

function Chat() {
	document.title = "شغلي"
	let params = useParams()
	const { auth } = useContext(AuthContext)
	const [messages, setMessages] = useState([])
	const [conversations, setConversations] = useState([])
	useEffect(async () => {
		try {
			const conversationsResponse = await api.get("/chats", {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			setConversations(conversationsResponse.data.data)
			console.dir(conversationsResponse.data.data)
		} catch (err) {
			console.error(err)
		}
	}, [messages])

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
	}, [params.correspondentId])
	return (
		Boolean(conversations.length) && (
			<div className="chat chat-page">
				<div className="chat-page-heading">
					<Link to="/#">
						<h1 className="chat-page-brand-name">شــــغــــلــــي</h1>
					</Link>
					<h3 className="chat-page-title">المحادثات</h3>
				</div>
				<div className="chat-contents">
					<div className="conversation-list">
						{conversations.map((conversation) => (
							<ConversationCard
								conversation={conversation}
								key={conversation.user.id}
								selected={params.correspondentId === conversation.user.id}
							/>
						))}
					</div>
					<div className="chat-container">
						<div className="messages-view">
							{messages.map((message) => (
								<ChatBubble
									position={message.isOwner ? "right" : "left"}
									message={message}
									key={message.messageId}
								/>
							))}
						</div>
						<SendMessage />
					</div>
				</div>
			</div>
		)
	)
}

export default Chat
