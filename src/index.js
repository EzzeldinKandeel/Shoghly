import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomeScreen from "./routes/HomeScreen"
import Professions from "./routes/Professions"
import SingleProfession from "./routes/SingleProfession"
import WorkerPage from "./routes/WorkerPage"
import { AuthProvider } from "./context/AuthProvider"
import SignUp from "./routes/SignUp"
import Settings from "./routes/Settings"
import ReviewsPage from "./routes/ReviewsPage"
import Conversations from "./routes/Conversations"
import Favorites from "./routes/Favorites"
import EditProfile from "./routes/EditProfile"
import ChangePassword from "./routes/ChangePassword"
import ResetPassword from "./routes/ResetPassword"
import SignIn from "./routes/SignIn"
import EmailVerification from "./routes/EmailVerification"
import SearchPage from "./routes/SearchPage"
import SignleProject from "./routes/SingleProject"
import ProjectsPage from "./routes/ProjectsPage"
import DeleteAccount from "./routes/DeleteAccount"
import ProfessionsContainer from "./routes/ProfessionsContainer"
import PageDoesNotExist from "./routes/PageDoesNotExist"
import Chat from "./routes/Chat"

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="sign-in" element={<SignIn />} />
					<Route path="/" element={<App />}>
						<Route path="" element={<HomeScreen />} />
						<Route path="sign-up" element={<SignUp />} />
						<Route path="email-verification" element={<EmailVerification />} />
						<Route path="professions" element={<ProfessionsContainer />}>
							<Route path="" element={<Professions />} />
							<Route path=":profession" element={<SingleProfession />} />
						</Route>
						<Route path="favorites" element={<Favorites />} />
						<Route path="conversations">
							<Route path="" element={<Conversations />} />
							<Route path=":correspondentId" element={<Chat />} />
						</Route>
						<Route path="worker:workerId" element={<WorkerPage />} />
						<Route path="settings">
							<Route path="" element={<Settings />} />
							<Route path="edit-profile" element={<EditProfile />} />
							<Route path="change-password" element={<ChangePassword />} />
							<Route path="delete-account" element={<DeleteAccount />} />
						</Route>
						<Route path="reviews" element={<ReviewsPage />} />
						<Route path="edit-profile" element={<EditProfile />} />
						<Route path="reset-password" element={<ResetPassword />} />
						<Route path="search" element={<SearchPage />} />
						<Route path="projects">
							<Route path="" element={<ProjectsPage />} />
							<Route path=":projectId" element={<SignleProject />} />
						</Route>
						<Route path="chat" element={<Chat />} />
						<Route path="*" element={<PageDoesNotExist />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
)
