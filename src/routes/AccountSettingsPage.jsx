import React from 'react';
import Footer from '../components/footer';
import AccountSettings from '../components/AccountSettings';
import Navbar from '../components/navbar';

function AccountSettingsPage() {
    return (
        <div className='container'>
            <Navbar />
            <AccountSettings />
            <Footer />
        </div>
    )
}

export default AccountSettingsPage