import React, { useEffect, useContext, useState } from "react"
import "../styles/HomeScreen.css"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import DashboardEntry from "./../components/DashboardEntry"
import SearchIcon from "@mui/icons-material/Search"
import WorkIcon from "@mui/icons-material/Work"
import ReviewsIcon from "@mui/icons-material/Reviews"
import CollectionsIcon from "@mui/icons-material/Collections"
import VerificationNotification from "../components/VerificationNotification"
import BookmarksIcon from "@mui/icons-material/Bookmarks"
import { getPopularProfessions } from "../data"
import ProfessionCard from "../components/ProfessionCard"
import SmallWorkerCard from "../components/SmallWorkerCard"

function HomeScreen() {
	const { auth } = useContext(AuthContext)
	const [firstName, setFirstName] = useState("بك")
	const [favorites, setFavorites] = useState([])

	useEffect(async () => {
		if (auth) {
			try {
				const nameResponse = await api.get("/users", {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
				setFirstName(nameResponse.data.data.firstName)
			} catch (err) {
				console.error(err)
			}
		}
	}, [auth])

	return (
		<div className="main-content">
			{auth && <h2 style={{ color: "var(--gray)" }}>أهلًا، {firstName}!</h2>}
			<section className="dashboard">
				<DashboardEntry icon={WorkIcon} entryName="الحرف" path="/professions" />
				{auth?.role === "client" && (
					<DashboardEntry
						icon={BookmarksIcon}
						entryName="المفضلون"
						path="/favorites"
					/>
				)}
				{auth?.role === "worker" && (
					<>
						<DashboardEntry
							icon={ReviewsIcon}
							entryName="التعليقات"
							path="/reviews"
						/>
						<DashboardEntry
							icon={CollectionsIcon}
							entryName="المعرض"
							path="/projects"
						/>
					</>
				)}
				{auth && (
					<DashboardEntry icon={SearchIcon} entryName="بحث" path="/search" />
				)}
			</section>
			<section className="popular-professions">
				{popularProfessions.map((profession) => {
					return (
						<ProfessionCard key={profession.name} profession={profession} />
					)
				})}
			</section>
			{auth?.role === "client" && Boolean(favorites.length) && (
				<section className="homescreen-favorite-workers">
					{favorites.map((fav) => (
						<SmallWorkerCard key={fav.worker.id} worker={fav.worker} />
					))}
				</section>
			)}
		</div>
	)
}

export default HomeScreen
