import React, { useRef, useState, useContext } from "react"
import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import LoadingBackdrop from "./LoadingBackdrop"
import ErrorBackdrop from "./ErrorBackdrop"

function NewProject(props) {
	const { auth } = useContext(AuthContext)
	const imageRef = useRef(null)
	let imageData = new FormData()
	const [projectDescription, setProjectDescription] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	function handleChange(e) {
		setProjectDescription(e.target.value)
	}
	async function handleSubmit(e) {
		e.preventDefault()
		for (let i = 0; i < imageRef?.current.files.length; i++)
			imageData.append("photos", imageRef.current.files[i])
		setIsLoading(true)
		try {
			let uploadResponse = await api.post("/upload", imageData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${auth.token}`
				}
			})
			let imageURLs = uploadResponse.data.data.map((image) => image.url)
			await api.post(
				"/workers/projects",
				{ urls: imageURLs, description: projectDescription },
				{ headers: { Authorization: `Bearer ${auth.token}` } }
			)
			props.setGetTrigger((prevGetTrigger) => !prevGetTrigger)
			props.setNewProject(false)
		} catch (err) {
			setError(true)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form className="new-project" onSubmit={handleSubmit}>
			<LoadingBackdrop open={isLoading} />
			<ErrorBackdrop open={error} close={() => setError(false)} />
			<div className="data-container">
				<label>أضف صور</label>
				<input
					ref={imageRef}
					type="file"
					name="picture"
					accept="image/*"
					multiple
					required
				/>
			</div>
			<div className="data-container">
				<label>أضف وصف</label>
				<textarea
					name="projectDescription"
					value={projectDescription}
					onChange={handleChange}
					cols="30"
					rows="10"
					style={{ width: "100%" }}
				></textarea>
			</div>
			<div className="review-box--buttons">
				<button
					type="button"
					className="secondary-button review-box--button"
					onClick={() => {
						props.setNewProject(false)
					}}
				>
					إلغاء
				</button>
				<button type="submit" className="main-button review-box--button">
					نشر
				</button>
			</div>
		</form>
	)
}

export default NewProject
