import React, { useEffect, useContext, useState } from "react"
import "../styles/HomeScreen.css"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import DashboadEntry from "./../components/DashboardEntry"
import SearchIcon from "@mui/icons-material/Search"
import WorkIcon from "@mui/icons-material/Work"
import ReviewsIcon from "@mui/icons-material/Reviews"
import CollectionsIcon from "@mui/icons-material/Collections"
import VerificationNotification from "../components/VerificationNotification"

function HomeScreen() {
	const { auth } = useContext(AuthContext)
	const [firstName, setFirstName] = useState("")

	useEffect(async () => {
		if (auth) {
			try {
				const response = await api.get("/users", {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
				setFirstName(response.data.data.firstName)
			} catch (err) {
				console.error(err)
			}
		}
	}, [auth])

	return (
		<div className="main-content">
			{auth && <h2 style={{ color: "var(--gray)" }}>أهلًا، {firstName}!</h2>}
			<section className="dashboard">
				<DashboadEntry icon={WorkIcon} entryName="الحرف" path="/professions" />
				{auth?.role === "worker" && (
					<>
						<DashboadEntry
							icon={ReviewsIcon}
							entryName="التعليقات"
							path="/reviews"
						/>
						<DashboadEntry
							icon={CollectionsIcon}
							entryName="المعرض"
							path="/projects"
						/>
					</>
				)}
				<DashboadEntry icon={SearchIcon} entryName="بحث" path="/search" />
			</section>
		</div>
	)
}

export default HomeScreen
