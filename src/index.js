import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import HomeScreen from "./routes/HomeScreen";
import Profession from "./routes/professions";
import SingleProfession from "./routes/SingleProfession";
import WorkerPage from "./routes/WorkerPage";
import { AuthProvider } from "./context/AuthProvider";
import SignUp from "./routes/SignUp";
import SettingsPage from "./routes/SettingsPage";
import ReviewsPage from "./routes/ReviewsPage";
// import Conversations from "./routes/Conversations"
import FavoritesPage from "./routes/FavoritesPage";
import EditProfilePage from "./routes/EditProfilePage";
import AccountSettingsPage from "./routes/AccountSettingsPage";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
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
						<Route path="reviews" element={<ReviewsPage />} />
						<Route path="edit-profile" element={<EditProfilePage />} />
						<Route path="account-settings" element={<AccountSettingsPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
