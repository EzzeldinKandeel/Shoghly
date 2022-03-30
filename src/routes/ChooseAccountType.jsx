import React from 'react';
import AccountTypeBox from '../components/account-type-box';
import Navbar from '../components/navbar';

function ChooseAccountType() {
    return (
        <div className='container'>
            <Navbar />
            <AccountTypeBox />
        </div>
    )
}

export default ChooseAccountType;