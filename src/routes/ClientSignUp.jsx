import React from 'react';
import Navbar from '../components/navbar';
import ClientSignupBox from '../components/client-signup-box';
import Footer from '../components/footer';

function ClientSignUp() {
    return (
        <div className='container'>
            <Navbar />
            <ClientSignupBox />
            <Footer />
        </div>
    )
}

export default ClientSignUp;