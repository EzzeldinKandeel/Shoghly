import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./routes/login"
import HomeScreen from "./routes/HomeScreen"
import Profession from "./routes/professions"
import SingleProfession from "./routes/SingleProfession"
import WorkerPage from "./routes/WorkerPage"
// import Conversations from "./routes/Conversations"
import { UserProvider } from "./context/UserProvider"
import SignUp from "./routes/SignUp"
import SettingsPage from "./routes/SettingsPage"
import FavoritesPage from "./routes/FavoritesPage"
import EditProfilePage from "./routes/EditProfilePage"
import AccountSettingsPage from "./routes/AccountSettingsPage"
import WorkerReviewsPage from "./routes/WorkerReviewsPage"
import WorkerProjectsPage from "./routes/WorkerProjectsPage"

ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="" element={<HomeScreen />} />
						<Route path="login" element={<Login />} />
						<Route path="sign-up" element={<SignUp />} />
						<Route path="professions" element={<App />}>
							<Route path="" element={<Profession />} />
							<Route path=":profession" element={<SingleProfession />} />
						</Route>
						<Route path="favorites" element={<FavoritesPage />} />
						{/* <Route path="conversations" element={<Conversations />} /> */}
						<Route path="worker:workerId" element={<WorkerPage />} />
						<Route path="settings" element={<SettingsPage />} />
						<Route path="edit-profile" element={<EditProfilePage />} />
						<Route path="account-settings" element={<AccountSettingsPage />} />
						<Route path="reviews" element={<WorkerReviewsPage />} />
						<Route path="projects" element={<WorkerProjectsPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
