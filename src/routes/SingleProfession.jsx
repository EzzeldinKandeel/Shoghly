import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import LargeWorkerCard from "../components/LargeWorkerCard";
import Navbar from "../components/navbar";
import "../styles/SingleProfession.css";
import api from "../api/axios";

function SingleProfession() {
  let params = useParams();
  let profession = params.profession;

  const [workers, setWorkers] = React.useState([]);
  React.useEffect(async () => {
    try {
      const response = await api.get("/users", {
        params: { profession: profession },
      });
      setWorkers(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div className="workers">
        {workers.map((worker) => {
          return <LargeWorkerCard key={worker.id} worker={worker} />;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default SingleProfession;
