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
import homeScreenBackground from "../images/homeScreen.jpg"
import { getCities } from "../data"
import { getProfessionPictures } from "./../data"
import HomescreenFeatures from "../components/HomescreenFeatures"
import homescreenPicDemo from "../images/homescreen-demo.png"
import homescreenPicDemoTwo from "../images/homescreen-demo-2.png"
import homescreenPicDemoThree from "../images/homescreen-demo-3.png"
import homescreenPicDemoFour from "../images/homescreen-demo-4.png"

function HomeScreen() {
	const professions = getProfessionPictures()
	const { auth } = useContext(AuthContext)
	const [searchQuery, setSearchQuery] = useState("")

	useEffect(async () => {
		if (searchQuery.length > 0) {
			try {
				const response = await api.get("/autoComplete", {
					params: { text: searchQuery },
					headers: { Authorization: `Bearer ${auth.token}` }
				})
			} catch (err) {}
		} else {
		}
	}, [searchQuery])

	function handleChange(e) {
		let value = e.target.value
		setSearchQuery(value)
	}

	return (
		<div className="main-content ">
			<img src={homeScreenBackground} className="homescreen-background" />
			<div className="search-box-container">
				<div className="homescreen-caption">
					<span className="homescreen-caption-large">
						أحصل بسهولة على الخدمة
					</span>
					<span className="homescreen-caption-small">
						تمتع بخدمة آلاف العاملين
					</span>
				</div>
				<div className="search-box-content">
					<input
						name="search"
						value={searchQuery}
						onChange={handleChange}
						type="search"
						className="input-box search-box"
						placeholder="ابحث عن اسم العامل"
						autoComplete="off"
					/>
					<button className="search-submit main-button">بحث</button>
				</div>
			</div>
			<div className="homescreen-features">
				<HomescreenFeatures
					title={"احصل على خدمات عالية الجودة"}
					description={
						"لاتخاذ قرارك بثقة، يمكنك التحقق من جودة خدمات مقدم الخدمة عبر قراءة تقييمات حقيقية لعملاء سبق وتعاملوا معه."
					}
					picture={homescreenPicDemo}
				/>
				<HomescreenFeatures
					title={"وفر وقتك"}
					description={
						"لا تضيّع وقتك في التحقق من مراجع الأصدقاء والعائلة. احصل على عروض مخصصة للخدمة التي تريدها عبر الإنترنت، واحتفظ بوقتك لقضائه مع أحبائك."
					}
					picture={homescreenPicDemoTwo}
				/>
				<HomescreenFeatures
					title={"كن واثقًا"}
					description={
						"نؤمّن حصولك على الخدمة التي تريدها مع ضمانة راحة البال."
					}
					picture={homescreenPicDemoThree}
				/>
				<HomescreenFeatures
					title={"استخدمه ببساطة"}
					description={
						"خذ دقيقة من وقتك للإجابة على أسئلة مجهزة خصّيصا للخدمة التي تريدها وانجز مهامك بسهولة."
					}
					picture={homescreenPicDemoFour}
				/>
			</div>
			<h2 className="homescreen-professions-title">
				<div className="scroll-to" id="professions"></div>
				<span>15+</span>الــخــدمــات
			</h2>
			<div className="homescreen-professions">
				{professions.map((profession) => (
					<ProfessionCard profession={profession} key={profession.name} />
				))}
			</div>
		</div>
	)
}

export default HomeScreen
