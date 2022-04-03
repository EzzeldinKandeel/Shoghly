import React from 'react';
import Navbar from '../components/navbar';
import ProfessionCards from '../components/ProfessionCards';
import database from '../data'
import '../styles/professions.css'

function Profession() {

    const [data, setData] = React.useState(database)

    return (
        <div className='container'>
            <Navbar />
            <div className='profession-cards'>
                {data["professions"].map(profession => {
                    return <ProfessionCards 
                        professionEnglish={profession.engish_name}
                        professionArabic={profession.arabic_name}
                    />
                })}
            </div>
        </div>
    )
}

export default Profession;