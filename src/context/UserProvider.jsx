import { createContext, useState } from "react"

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		firstName: "شكري",
		lastName: "نجيب",
		email: "shokri_n@gmail.com",
		password: "redblueA@2",
		gender: "male",
		role: "worker",
		profession: "تركيب أرضيات",
		phone: "01113760002",
		country: "مصر",
		city: "سوهاج",
		line: "",
		birthDate: "1985-03-26",
		id: 2,
		projects: [],
		reviews: [
			{
				rating: "2",
				title: "مش قد كده",
				body: "لا تعطوه أموالكم.",
				dateTime: "2022-05-09T17:49:18.221Z",
				clientId: 1,
				id: 0
			},
			{
				rating: "5",
				title: "أحسن أرضيات",
				body: "أعطوه أموالكم.",
				dateTime: "2022-05-09T17:50:17.493Z",
				clientId: 3,
				id: 1
			}
		],
		profilePictureUrl: "ian-dooley-d1UPkiFd04A-unsplash.jpg",
		favoritesId: [],
		blockedId: [],
		registrationDate: "2022-05-06T20:29:28.228Z"
	})

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
