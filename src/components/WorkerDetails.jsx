import React from "react"
import "../styles/WorkerDetails.css"
import workerPic from "../images/placeholder_300px_300px.png"
import ReviewBox from "./ReviewBox"
import { imageServerUrl } from "./../api/imageServerApi"
import { useParams } from "react-router-dom"
import api from "../api/axios"
import NewReview from "./NewReview"
import CustomRating from "./CustomRating"
import UserContext from "../context/UserProvider"
import PhoneIcon from '@mui/icons-material/Phone';

function WorkerDetails() {
	const { user } = React.useContext(UserContext)
	let params = useParams()

	const [getTrigger, setGetTrigger] = React.useState(true)
	const [worker, setWorker] = React.useState(null)
	const [newReview, setNewReview] = React.useState(false)
	React.useEffect(async () => {
		try {
			const response = await api.get("/users", {
				params: { id: params.workerId }
			})
			setWorker(response.data[0])
			console.log(response.data[0])
		} catch (err) {
			console.error(err.message)
		}
	}, [getTrigger])
	var rating = 0
	console.log(worker)
	if (worker) {
		worker.reviews.forEach((review) => {
			rating += parseInt(review.rating) / worker.reviews.length
		})
	}
	function deleteReview(index) {
		return async () => {
			let reviews = worker.reviews
			reviews.splice(index, 1)
			try {
				const response = await api.patch(`/users/${worker.id}`, {
					reviews: reviews
				})
				setWorker(response.data)
			} catch (err) {
				console.error(err.message)
			}
		}
	}
	return (
		worker && (
			<div className="worker-details">
				<div className="main-details">
					<div className="main-details--image">
						<img
							width="300"
							height="300"
							src={
								worker.profilePictureUrl
									? `${imageServerUrl}/${worker.profilePictureUrl}`
									: workerPic
							}
							alt="Picture of The Worker"
						/>
					</div>
					<div className="main-details--text">
						<h1>
							{worker.firstName} {worker.lastName}
						</h1>
						<h4>{worker.profession}</h4>
						<h4>{worker.city}</h4>
						{worker.line && <h4>{worker.line}</h4>}
						<h4 style={{display: "flex", alignItems: "center", gap: "5px"}}><PhoneIcon />{worker.phone}</h4>
						<h4 style={{fontSize: "12px"}}>
							{rating ? (
								<CustomRating name="workerRating" value={rating} readOnly />
							) : (
								"لا يوجد تقييم"
							)}
						</h4>
					</div>
				</div>
				{/* <div className='bio'>
				{worker.bio}
			</div> */}
				{Boolean(worker.projects.length) && (
					<div className="projects">
						<h2>المعرض</h2>
						<div className="photos">
							{worker.projects.map((project)=> <img src={`${imageServerUrl}/${project}`} height="200px" />)}
						</div>
					</div>
				)}

				<div className="reviews">
					<h2>التعليقات</h2>
					{user &&
						(newReview ? (
							<div style={{ marginBottom: "1rem" }}>
								<NewReview
									setNewReview={setNewReview}
									setGetTrigger={setGetTrigger}
									worker={worker}
								/>
							</div>
						) : (
							<button
								className="main-button"
								style={{ width: "150px", marginBottom: "1rem" }}
								onClick={() => setNewReview(true)}
							>
								أضف تعليق
							</button>
						))}
					{Boolean(worker.reviews.length) && (
						<div className="review-boxes">
							{worker.reviews.map((review) => (
								<ReviewBox
									key={worker.reviews.indexOf(review)}
									deleteReview={deleteReview(worker.reviews.indexOf(review))}
									review={review}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		)
	)
}

export default WorkerDetails
