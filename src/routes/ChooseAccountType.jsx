import React from 'react';
import AccountTypeBox from '../components/account-type-box';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

function ChooseAccountType() {
    return (
        <div className='container'>
            <Navbar />
            <AccountTypeBox />
            <Footer />
        </div>
    )
}

export default ChooseAccountType;