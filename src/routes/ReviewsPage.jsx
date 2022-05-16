import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import UserContext from "../context/UserProvider";
import ReviewBox from "../components/ReviewBox";
import "../styles/ReviewsPage.css";

function ReviewsPage() {
	const { user, setUser } = React.useContext(UserContext);
	console.log(user.reviews);
	return (
		<div className="container">
			<Navbar />
			<div className="reviews-container">
				<h2>جميع تقييماتك</h2>
				<div className="review-boxes-container">
					{user.reviews.map((review) => (
						<ReviewBox key={user.reviews.indexOf(review)} review={review} />
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ReviewsPage;
