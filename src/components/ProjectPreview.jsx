import React from "react"
import { Link } from "react-router-dom"
import "../styles/ProjectPreview.css"

function ProjectPreview(props) {
	let project = props.project
	return (
		<div className="project-preview">
			<Link className="project-preview-content" to={`/project${project.projectId}`}>
				<img className="project-preview-pic" height="300" src={project.url} />
				<p className="project-preview-description">{project.description}</p>
			</Link>
		</div>
	)
}

export default ProjectPreview
