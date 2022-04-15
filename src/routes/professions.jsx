import React from 'react';
import Footer from '../components/footer';
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
                        key={profession.english_name}
                        professionEnglish={profession.english_name}
                        professionArabic={profession.arabic_name}
                    />
                })}
            </div>
            <Footer />
        </div>
    )
}

export default Profession;