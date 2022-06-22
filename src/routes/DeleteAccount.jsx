import React, { useContext } from "react"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import WarningIcon from "@mui/icons-material/Warning"

function DeleteAccount() {
	const { auth, setAuth } = useContext(AuthContext)
	let navigate = useNavigate()
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
			console.error(err)
		}
	}

	return (
		<div style={style}>
			<h2 className="align-icon" style={{ fontWeight: "400", margin: "0px", color: "var(--red)" }}>
				<WarningIcon />
				تحذير
			</h2>
			<h2 style={{ fontWeight: "200", marginBlockEnd: "2rem", marginBlockStart: "0.2rem" }}>هذا الفعل لا يمكن عكسه</h2>
			<button className="main-button" onClick={deleteAccount}>
				حذف الحساب
			</button>
		</div>
	)
}

export default DeleteAccount
