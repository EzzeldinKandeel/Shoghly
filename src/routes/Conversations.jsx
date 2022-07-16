import React, { useState, useContext, useEffect } from "react"
import AuthContext from "../context/AuthProvider"
import "../styles/Chat.css"
import api from "../api/axios"
import ConversationCard from "../components/ConversationCard"
import Navbar from "../components/Navbar"

function Conversations() {
	document.title = "المحادثات - شغلي"
	const { auth } = useContext(AuthContext)
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
	}, [])
	return (
		<>
			<Navbar />
			{Boolean(conversations.length) ? (
				<div className="chat conversations-page">
					<div className="conversation-list-page">
						{conversations.map((conversation) => (
							<ConversationCard
								conversation={conversation}
								key={conversation.user.id}
							/>
						))}
					</div>
				</div>
			) : (
				<div style={{ height: "calc(100vh - 100px)", display: "flex" }}>
					<h1 className="content-does-not-exist">لا توجد محادثات</h1>
				</div>
			)}
		</>
	)
}

export default Conversations
