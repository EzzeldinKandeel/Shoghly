import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import LargeWorkerCard from "../components/LargeWorkerCard";
import { getData } from "../data";
import "../styles/SingleProfession.css";

function Favorites() {
  let data = getData();
  return (
    <div className="container">
      <Navbar />
      <div className="workers">
        {data.favorites.map((worker) => {
          return <LargeWorkerCard key={worker.id} worker={worker} />;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Favorites;
