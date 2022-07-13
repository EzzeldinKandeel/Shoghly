import React, { useContext, useState } from "react"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import WarningIcon from "@mui/icons-material/Warning"
import ErrorBackdrop from "../components/ErrorBackdrop"

function DeleteAccount() {
	document.title = "حذف الحساب - شغلي"
	const { auth, setAuth } = useContext(AuthContext)
	let navigate = useNavigate()
	const [error, setError] = useState(false)
	const style = {
		margin: "auto",
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}

	async function deleteAccount() {
		try {
			await api.delete("/users", {
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			setAuth(null)
			localStorage.removeItem("shoghlyAppAuth")
			navigate("/")
		} catch (err) {
			setError(true)
		}
	}

	return (
		<div style={style}>
			<ErrorBackdrop open={error} close={() => setError(false)} />
			<h2
				className="align-icon"
				style={{
					fontWeight: "400",
					margin: "0px",
					color: "var(--clr-accent-400)"
				}}
			>
				<WarningIcon />
				تحذير
			</h2>
			<h2
				style={{
					fontWeight: "200",
					marginBlockEnd: "2rem",
					marginBlockStart: "0.2rem"
				}}
			>
				هذا الفعل لا يمكن عكسه
			</h2>
			<button className="main-button" onClick={deleteAccount}>
				حذف الحساب
			</button>
		</div>
	)
}

export default DeleteAccount
