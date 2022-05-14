import axios from "axios"

export const imageServerUrl = "https://api.imgbb.com/1/upload"

export default axios.create({
	baseURL: imageServerUrl
})
