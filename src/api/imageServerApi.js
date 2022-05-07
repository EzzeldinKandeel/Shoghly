import axios from "axios"

export const imageServerUrl = "http://localhost:3001"

export default axios.create({
	baseURL: imageServerUrl
})
