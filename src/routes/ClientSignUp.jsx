import React from 'react';
import Navbar from '../components/navbar';
import ClientSignupBox from '../components/client-signup-box';

function ClientSignUp() {
    return (
        <div className='container'>
            <Navbar />
            <ClientSignupBox />
        </div>
    )
}

export default ClientSignUp;