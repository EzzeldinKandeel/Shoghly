import { createContext, useState } from "react"

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		firstName: "سامح",
		lastName: "حمدى",
		email: "sameh_hamdi@yahoo.com",
		password: "yellowyelloW1!",
		gender: "male",
		role: "client",
		profession: "",
		phone: "01006388264",
		country: "مصر",
		city: "بني سويف",
		line: "",
		birthDate: "1980-02-03",
		id: 1,
		projects: [],
		reviews: [],
		profilePictureUrl: "",
		favoritesId: [2, 4],
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
