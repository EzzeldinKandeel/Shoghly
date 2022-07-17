import React from "react"
import "../styles/Settings.css"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import { HashLink as Link } from "react-router-hash-link"

function Settings() {
	document.title = "الإعدادات - شغلي"
	return (
		<div className="settings">
			<Link to="/settings/edit-profile/#" className="settings-section">
				تعديل بيانات الحساب
				<ArrowBackIosNewIcon fontSize="small" />
			</Link>
			<Link to="/settings/change-password/#" className="settings-section">
				تغيير كلمة السر
				<ArrowBackIosNewIcon fontSize="small" />
			</Link>
			<Link to="/settings/delete-account/#" className="settings-section">
				حذف الحساب
				<ArrowBackIosNewIcon fontSize="small" />
			</Link>
		</div>
	)
}

export default Settings
