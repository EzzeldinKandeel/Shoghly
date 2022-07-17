import React, { useContext, useState, useEffect } from "react"
import AuthContext from "../context/AuthProvider"
import api from "../api/axios"
import "../styles/ProjectsPage.css"
import ProjectPreview from "./../components/ProjectPreview"
import NewProject from "./../components/NewProject"

function ProjectsPage() {
	document.title = "المعرض - شغلي"
	const { auth } = useContext(AuthContext)
	const [projects, setProjects] = useState([])
	const [newProject, setNewProject] = useState(false)
	const [getTrigger, setGetTrigger] = useState(true)

	useEffect(async () => {
		try {
			const response = await api.get(`/workers/${auth.id}/projects`)
			setProjects(response.data.data)
		} catch (err) {
			console.error(err)
		}
	}, [getTrigger])
	return (
		<div className="projects-page">
			<h2>المعرض</h2>
			{newProject ? (
				<NewProject
					setGetTrigger={setGetTrigger}
					setNewProject={setNewProject}
				/>
			) : (
				<button
					className="main-button"
					style={{ width: "150px", marginBlockStart: "-1rem" }}
					onClick={() => {
						setNewProject(true)
					}}
				>
					أضف مجموعة
				</button>
			)}
			{projects.length ? (
				<div className="project-cards">
					{projects
						.filter((project) => project.pictures[0] !== null)
						.map((project) => (
							<ProjectPreview project={project} key={project.id} />
						))}
				</div>
			) : (
				<h1 className="content-does-not-exist">لا توجد مجموعات</h1>
			)}
		</div>
	)
}

export default ProjectsPage
