import React from "react";
import worker_picture from "../images/placeholder_150px_150px.png"

function Card () {
    return (
        <a src="" className="card">
            <img src={worker_picture} alt="picture of the worker" />
            <h3 id="worker-name"></h3>
            <h4 id="profession"></h4>
        </a>
    )
}

export default Card;