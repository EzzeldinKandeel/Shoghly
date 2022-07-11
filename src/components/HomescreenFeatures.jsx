import React from "react"

function HomescreenFeatures(props) {
	return (
		<div className={`homescreen-feature`}>
			<div className="homescreen-feature-text">
				<h3>{props.title}</h3>
				<p>{props.description}</p>
			</div>
			<img
				src={props.picture}
				className="image-cover"
				height="150"
				width="150"
			/>
		</div>
	)
}

export default HomescreenFeatures
