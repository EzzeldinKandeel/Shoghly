import React from "react"

function SendMessage() {
	function handleSubmit(e) {
		e.preventDefault()
	}
	return (
		<div>
			<form className="message-creation" onSubmit={handleSubmit}>
				<textarea
					placeholder="اكتب رسالتك"
					className="new-message-field"
					rows="3"
				/>
				<button className="main-button send-message-btn">إرسال</button>
			</form>
		</div>
	)
}

export default SendMessage
