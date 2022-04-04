import React from 'react';
import { Link } from "react-router-dom";
import workerPic from '../images/placeholder_100px_100px.png';

function LargeWorkerCard(props) {

    var rating = 0;
    for (const review in props.worker.reviews) {
        rating += (review.rating)/(props.worker.reviews.length);
    }

    return (
        <Link to={`/professions/${props.worker.id}`}>
            <div className='large-worker-card'>
                <img src={workerPic} alt="picture of the worker" />
                <h2 key={props.worker.id}>{`${props.worker.name.first} ${props.worker.name.last}`}</h2>
                <h4>{`${rating}/5`}</h4>
            </div>
        </Link>
    )
}

export default LargeWorkerCard;