import React from "react";
import "../styles/WorkerDetails.css";
import workerPic from "../images/placeholder_300px_300px.png";
import ReviewBox from "./ReviewBox";
import { imageServerUrl } from "./../api/imageServerApi";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function WorkerDetails() {
  let params = useParams();

  const [getTrigger, setGetTrigger] = React.useState(true);
  const [worker, setWorker] = React.useState(null);
  const [newReview, setNewReview] = React.useState(false);
  React.useEffect(async () => {
    try {
      const response = await api.get("/users", {
        params: { id: params.workerId },
      });
      setWorker(response.data[0]);
      console.log(response.data[0]);
    } catch (err) {
      console.error(err.message);
    }
  }, [getTrigger]);
  var rating = 0;
  // console.log(worker)
  // worker.reviews.forEach((review) => {
  // 	rating += review.rating / worker.reviews.length
  // })

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
            <h4>{worker.city}</h4>
            <h4>{worker.profession}</h4>
            <h4>{rating ? `${rating}/5` : "لا يوجد تقييم"}</h4>
          </div>
        </div>
        {/* <div className='worker-details--secondary-section bio'>
				{worker.bio}
			</div> */}
        <div className="worker-details--secondary-section projects">
          <h2>المعرض</h2>
        </div>
        <div className="worker-details--secondary-section reviews">
          <h2>التعليقات</h2>
          {/*newReview ? (
						<NewReview
							setNewReview={setNewReview}
							setGetTrigger={setGetTrigger}
							worker={worker}
						/>
					) : (
						<button
							className="main-button"
							style={{ width: "150px" }}
							onClick={() => setNewReview(true)}
						>
							أضف تعليق
						</button>
					)*/}
          {Boolean(worker.reviews.length) && (
            <div className="review-boxes">
              {worker.reviews.map((review) => (
                <ReviewBox key={review.review_id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default WorkerDetails;
