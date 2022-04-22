import React from 'react';
import "../styles/WorkerDetails.css"
import workerPic from "../images/placeholder_300px_300px.png"
import ReviewBox from './ReviewBox';

function WorkerDetails(props) {
    var rating = 0
    props.worker.reviews.forEach(review => {
        rating += (review.rating)/(props.worker.reviews.length);
    })

    return (
        <div className='worker-details'>
            <div className='main-details'>
                <div className='main-details--image'>
                    <img src={workerPic} alt="Picture of The Worker" />
                </div>
                <div className='main-details--text'>
                    <h1>{props.worker.name.first} {props.worker.name.last}</h1>
                    <h4>{props.worker.city}</h4>
                    <h4>{props.worker.profession}</h4>
                    <h4>{rating ? `${rating}/5` : "لا يوجد تقييم"}</h4>
                </div>
            </div>
            <div className='worker-details--secondary-section bio'>
                {props.worker.bio}
            </div>
            <div className='worker-details--secondary-section projects'>
                <h2>المعرض</h2>
            </div>
            <div className='worker-details--secondary-section reviews'>
                <h2>التعليقات</h2>
                <div className='review-boxes'>
                    {props.worker.reviews.map(review => (
                        <ReviewBox 
                            key={review.review_id}
                            review={review}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WorkerDetails;