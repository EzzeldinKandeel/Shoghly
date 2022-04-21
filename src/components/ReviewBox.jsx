import React from 'react';
import { getClient } from '../data';
import "../styles/ReviewBox.css"
import client_photo from "../images/placeholder_50px_50px.png"

function ReviewBox(props) {
    const client = getClient(props.review.client_id)

    return (
        <div className='review-box'>
            <div className='client-info'>
                <img src={client_photo} alt="Picture of the client who wrote the review" />
                <h5>{client.name.first} {client.name.last}</h5>
            </div>
            <div className='review-date'>
                <span>
                    الوقت:&nbsp;
                    {props.review.date.minute} :&nbsp;
                    {props.review.date.hour}
                    &nbsp;&nbsp;&nbsp;
                    التاريخ:&nbsp;
                    {props.review.date.day} /&nbsp;
                    {props.review.date.month} /&nbsp;
                    {props.review.date.year}
                </span>
            </div>
            <div className='rating-and-title'>
                <h6>{props.review.rating} / 5</h6>
                <h5>{props.review.review_head}</h5>
            </div>
            <div className='review-body'>
                <p>{props.review.review_body}</p>
            </div>
        </div>
    )
}

export default ReviewBox