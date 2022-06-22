import React from "react"
import "../styles/Settings.css"
import { Link } from "react-router-dom"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

function Settings() {
	return (
		<div className="settings">
			<Link to="/settings/edit-profile" className="settings-section">
				تعديل الصفحة الشخصية
				<ArrowBackIosNewIcon fontSize="small" />
			</Link>
			<Link to="/settings/change-password" className="settings-section">
				تغيير كلمة السر
				<ArrowBackIosNewIcon fontSize="small" />
			</Link>
			<Link to="/settings/delete-account" className="settings-section">
				حذف الحساب
				<ArrowBackIosNewIcon fontSize="small" />
			</Link>
		</div>
	)
}

export default Settings
