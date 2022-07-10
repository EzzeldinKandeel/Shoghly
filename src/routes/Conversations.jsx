import React, { useState, useContext, useEffect } from "react"
import AuthContext from "../context/AuthProvider"
import "../styles/Chat.css"
import api from "../api/axios"
import ConversationCard from "../components/ConversationCard"

function Conversations() {
	const { auth } = useContext(AuthContext)
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
	}, [])
	return Boolean(conversations.length) ? (
		<div className="chat">
			<h2
				className="page-heading"
				style={{ marginInlineStart: "2rem", marginBlock: "1rem" }}
			>
				المحادثات
			</h2>
			<div className="conversation-list">
				{conversations.map((conversation) => (
					<ConversationCard
						conversation={conversation}
						key={conversation.user.id}
					/>
				))}
			</div>
		</div>
	) : (
		<h1 className="content-does-not-exist">لا توجد محادثات</h1>
	)
}

export default Conversations
