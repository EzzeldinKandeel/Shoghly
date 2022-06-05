import React from "react"
import "../styles/Settings.css"
import { Link } from "react-router-dom"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

function Settings() {
	return (
		<div className="settings">
			<Link to="/edit-profile" className="settings-section">
				تعديل الصفحة الشخصية
				<ArrowBackIosNewIcon fontSize="small" />
			</Link>
			<Link to="/account-settings" className="settings-section">
				تعديل بيانات الحساب
				<ArrowBackIosNewIcon fontSize="small" />
			</Link>
		</div>
	)
}

export default Settings
