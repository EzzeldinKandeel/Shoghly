import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { HashLink as Link } from "react-router-hash-link"

import api from "../api/axios"
import AuthContext from "../context/AuthProvider"
import DateView from "./../components/DateView"
import "../styles/SingleProject.css"
import avatar from "../images/avatar.png"

function SignleProject() {
	document.title = "المعرض - شغلي"
	let params = useParams()
	const { auth } = useContext(AuthContext)
	const [project, setProject] = useState(null)
	const [worker, setWorker] = useState(null)
	const [serverThrewError, setServerThrewError] = useState(false)
	useEffect(async () => {
		try {
			const projectResponse = await api.get(
				`/workers/projects/${params.projectId}`
			)
			const workerResponse = await api.get(
				`/workers/${projectResponse.data.project[0].workerId}`
			)
			setProject(projectResponse.data.project[0])
			setWorker(workerResponse.data.data)
			setServerThrewError(false)
		} catch (err) {
			setServerThrewError(true)
			console.error(err)
		}
	}, [])
	return project
		? worker && (
				<div className="project-page">
					<div>
						<Link
							className="project-creator"
							to={`/worker${project.workerId}/#`}
						>
							<img
								src={worker.picture || avatar}
								height="50"
								width="50"
								className="image-cover"
							/>
							<h2>
								{worker.firstName} {worker.lastName}
							</h2>
						</Link>
					</div>
					<div style={{ marginBlockStart: "-0.9rem" }}>
						<DateView
							dateCreated={project.createdAt}
							dateUpdated={project.updatedAt}
						/>
					</div>
					<p>{project.description}</p>
					<div className="project-pictures">
						{project.photos.map((photo) => (
							<a href={photo} key={photo}>
								<img className="project-picture" src={photo} />
							</a>
						))}
					</div>
				</div>
		  )
		: serverThrewError && (
				<h1 className="content-does-not-exist">
					المجموعة التى تحاول مشاهدتها غير موجودة.
				</h1>
		  )
}

export default SignleProject
