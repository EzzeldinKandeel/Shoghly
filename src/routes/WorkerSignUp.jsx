import React from 'react';
import Navbar from '../components/navbar';
import WorkerSignupBox from '../components/worker-signup-box';

function WorkerSignUp() {
    return (
        <div className='container'>
            <Navbar />
            <WorkerSignupBox />
        </div>
    )
}

export default WorkerSignUp;