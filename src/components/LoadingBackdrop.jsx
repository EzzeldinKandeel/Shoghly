import React from "react"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

function LoadingBackdrop(props) {
	return (
		<Backdrop open={props.open} style={{ zIndex: "999" }}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
}

export default LoadingBackdrop
