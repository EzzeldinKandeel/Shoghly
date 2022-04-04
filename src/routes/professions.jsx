import React from 'react';
import Navbar from '../components/navbar';
import ProfessionCards from '../components/ProfessionCards';
import {getData} from '../data'
import '../styles/professions.css'

function Profession() {

    const [data, setData] = React.useState(getData())

    return (
        <div className='container'>
            <Navbar />
            <div className='profession-cards'>
                {data["professions"].map(profession => {
                    return <ProfessionCards 
                        professionEnglish={profession.english_name}
                        professionArabic={profession.arabic_name}
                    />
                })}
            </div>
        </div>
    )
}

export default Profession;