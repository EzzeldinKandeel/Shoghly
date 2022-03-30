import React from 'react';
import MainContent from '../components/MainContent';
import Navbar from '../components/navbar';

function HomeScreen() {
    return (
        <div className='container'>
            <Navbar />
            <MainContent />
        </div>
    )
}

export default HomeScreen