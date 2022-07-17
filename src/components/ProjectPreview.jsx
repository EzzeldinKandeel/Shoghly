import React, { useState, useRef, useEffect } from "react"
import "../styles/ProjectPreview.css"
import { HashLink as Link } from "react-router-hash-link"

import DateView from "./DateView"

function ProjectPreview(props) {
	let project = props.project
	let imgRef = useRef()
	let dateRef = useRef()
	const [descriptionWidth, setDescriptionWidth] = useState(0)
	useEffect(() => {
		setDescriptionWidth(
			Math.max(imgRef.current?.width, dateRef.current?.clientWidth)
		)
	}, [imgRef, dateRef])
	return (
		<div className="project-preview">
			<Link
				className="project-preview-content"
				to={`/projects/${project.id}/#`}
			>
				<img
					ref={imgRef}
					className="project-preview-pic background-multiply"
					src={project.pictures[0]}
				/>
				<p
					className="project-preview-description"
					style={{ width: `${descriptionWidth}px` }}
				>
					{project.description}
				</p>
				<div className="project-preview-date" ref={dateRef}>
					<DateView
						dateCreated={project.createdAt}
						dateUpdated={project.updatedAt}
					/>
				</div>
			</Link>
		</div>
	)
}

export default ProjectPreview
