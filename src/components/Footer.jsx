import React from "react"
import "../styles/footer.css"
import GitHubIcon from "@mui/icons-material/GitHub"
import LinkedInIcon from "@mui/icons-material/LinkedIn"

function Footer() {
	return (
		<footer className="footer">
			<span>
				"Shoghly" was developed by a group of computer engineering students at
				Port Said University.
				<h4 className="align-icon">
					<LinkedInIcon />
					Linkedin Profiles
				</h4>
				<ul className="footer-links">
					<li>
						<a href="https://www.linkedin.com/in/ahmednmourad/">Ahmed Nabil</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/ezzeldin-kandeel-26248621a/">
							Ezzeldin Kandeel
						</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/ibrahimoraby/">
							Ibrahim Oraby
						</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/mernaketana/">Merna Ketana</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/mohamed-elshamy-4b8236185/">
							Mohamed Elshamy
						</a>
					</li>
				</ul>
			</span>
			<span>
				<h4 className="align-icon" style={{ marginBlockStart: "0px" }}>
					You may check out the code on
					<GitHubIcon />
					Github
				</h4>
				<ul className="footer-links">
					<li>
						<a href="https://github.com/ahmednmourad/shoghly">Backend</a>
					</li>
					<li>
						<a href="https://github.com/EzzeldinKandeel/Shoghly">Frontend</a>
					</li>
					<li>
						<a href="https://github.com/mernaketana/Shoghly-App">Mobile App</a>
					</li>
				</ul>
			</span>
		</footer>
	)
}

export default Footer
