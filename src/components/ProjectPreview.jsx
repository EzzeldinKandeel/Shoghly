import React from "react"
import { Link } from "react-router-dom"
import "../styles/ProjectPreview.css"
import DateView from "./DateView"

function ProjectPreview(props) {
	let project = props.project
	return (
		<div className="project-preview">
			<Link
				className="project-preview-content"
				to={`/projects/${project.projectId}`}
			>
				<img className="project-preview-pic background-multiply" src={project.pictures[0]} />
				<p className="project-preview-description">{project.description}</p>
				<div
					style={{ marginBlockStart: "-1.2rem", marginInlineStart: "-1rem" }}
				>
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
