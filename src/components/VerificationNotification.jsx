import React from "react"
import "../styles/VerificationNotification.css"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"

function VerificationNotification(props) {
	return (
		<div className="verification-notification">
			<WarningAmberIcon className="icon" />
			لقد تم ارسال كود التفعيل على الايميل الخاص بك. قم بتفعيل حسابك من
			<a href="/email-verification"> هنا </a>
		</div>
	)
}

export default VerificationNotification
