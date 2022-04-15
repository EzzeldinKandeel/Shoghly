import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/footer';
import LargeWorkerCard from '../components/LargeWorkerCard';
import Navbar from '../components/navbar';
import {getData, getProfession} from '../data'
import '../styles/SingleProfession.css'

function SingleProfession() {

    let data = getData();

    let params = useParams();
    let profession = getProfession(params.professionEnglish);

    return (
        <div className='container'>
            <Navbar />
            <div className='workers'>
                {data.workers.map(worker => {
                    return worker.profession === profession.arabic_name && <LargeWorkerCard key={worker.id} worker={worker} />
                })}
            </div>
            <Footer />
        </div>
    )
}

export default SingleProfession;