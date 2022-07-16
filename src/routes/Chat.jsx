import React, { useState, useEffect, useContext } from "react"
import SendMessage from "../components/SendMessage"
import "../styles/Chat.css"
import ChatBubble from "./../components/ChatBubble"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import ConversationCard from "../components/ConversationCard"
import { HashLink as Link } from "react-router-hash-link"
import Navbar from "../components/Navbar"
import { io } from "socket.io-client"

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
		// const socket = io(
		// 	`http://ec2-52-59-217-155.eu-central-1.compute.amazonaws.com:8080?token=${auth.token}`
		// )
		// socket.io.reconnection(false)
	}, [params.correspondentId])
	return (
		<>
			<Navbar />
			{Boolean(conversations.length) ? (
				<div className="chat chat-page">
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
			) : (
				<h1 className="content-does-not-exist">لا توجد محادثات</h1>
			)}
		</>
	)
}

export default Chat
