import React, { useContext, useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import ErrorBackdrop from "./ErrorBackdrop"

function SendMessage() {
	let params = useParams()
	const { auth } = useContext(AuthContext)
	const [message, setMessage] = useState("")
	const [error, setError] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		if (message !== "") {
			try {
				await api.post(
					"/messages",
					{ receiverId: params.correspondentId, text: message },
					{ headers: { Authorization: `Bearer ${auth.token}` } }
				)
				setMessage("")
			} catch (err) {
				setError(true)
			}
		}
	}
	return (
		<div>
			<ErrorBackdrop open={error} close={() => setError(false)} />
			<form className="message-creation" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="اكتب رسالتك"
					className="new-message-field"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className="main-button send-message-btn">
					<SendIcon style={{ transform: "scale(-1, 1)" }} />
				</button>
			</form>
		</div>
	)
}

export default SendMessage
