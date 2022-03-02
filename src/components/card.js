import React from "react";
import placeholder_150px from "../images/placeholder_150px_150px.jpg"

function Card () {
    return (
        <a src="" className="card">
            <img src={placeholder_150px} alt="picture of the worker" />
            <h3 id="worker-name">أحمد السقا</h3>
            <h4 id="profession">سباكة</h4>
        </a>
    )
}

export default Card;