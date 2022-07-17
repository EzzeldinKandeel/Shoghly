import React, { useEffect, useContext, useState } from "react"
import "../styles/HomeScreen.css"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import ProfessionCard from "../components/ProfessionCard"
import homeScreenBackground from "../images/homeScreen.jpg"
import { getProfessionPictures } from "./../data"
import HomescreenFeatures from "../components/HomescreenFeatures"
import homescreenPicDemo from "../images/homescreen-demo.png"
import homescreenPicDemoTwo from "../images/homescreen-demo-2.png"
import homescreenPicDemoThree from "../images/homescreen-demo-3.png"
import homescreenPicDemoFour from "../images/homescreen-demo-4.png"
import MiniWorkerCard from "../components/MiniWorkerCard"

function HomeScreen() {
	document.title = "الصفحة الرئيسية - شغلي"
	const professions = getProfessionPictures()
	const { auth } = useContext(AuthContext)
	const [city, setCity] = useState()
	const [searchQuery, setSearchQuery] = useState("")
	const [searchSuggestions, setSearchSuggestions] = useState([])
	const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)

	useEffect(async () => {
		if (auth) {
			try {
				const cityResponse = await api.get("/users", {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
				setCity(cityResponse.data.data.city)
			} catch (err) {
				console.error(err)
			}
		} else {
			setCity("القاهرة")
		}
	}, [])
	useEffect(async () => {
		try {
			const searchResponse = await api.get("/autoComplete", {
				params: { text: searchQuery, city: city }
			})
			console.log(searchResponse.data.results)
			setSearchSuggestions(searchResponse.data.results)
		} catch (err) {
			setSearchSuggestions([])
		}
	}, [searchQuery])
	useEffect(() => {
		if (!showSearchSuggestions) {
			setSearchSuggestions([])
		}
	}, [showSearchSuggestions])

	function handleChange(e) {
		let value = e.target.value
		setSearchQuery(value)
		if (e.target.value) {
			setShowSearchSuggestions(true)
		}
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
						onBlur={() =>
							setTimeout(() => setShowSearchSuggestions(false), 100)
						}
						type="search"
						className="input-box search-box"
						placeholder="ابحث عن اسم العامل"
						autoComplete="off"
					/>
					<button className="search-submit main-button">بحث</button>
					<div
						className="search-suggestions"
						style={{ display: showSearchSuggestions ? "flex" : "none" }}
					>
						{searchSuggestions.length ? (
							searchSuggestions.map((worker) => (
								<MiniWorkerCard worker={worker} key={worker.userId} />
							))
						) : (
							<span className="search-suggestions-no-results">
								لا توجد نتائج
							</span>
						)}
					</div>
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
