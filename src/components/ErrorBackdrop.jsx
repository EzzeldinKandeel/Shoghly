import React from "react"
import Backdrop from "@mui/material/Backdrop"
import Dialog from '@mui/material/Dialog';
import "../styles/ErrorBackdrop.css"

function ErrorBackdrop(props) {
	return (
		<Dialog open={props.open}>
			<div className="error-dialog">
				<h1 className="error-dialog-message">حدث خطأ ما! أعد المحاولة لاحقًا.</h1>
				<button className="main-button error-escape-button" onClick={props.close}>حسنًا</button>
			</div>
		</Dialog>
	)
}

export default ErrorBackdrop
