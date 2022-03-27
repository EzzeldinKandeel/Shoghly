import React from 'react';

function AccountType() {
    return (
        <div className='account-type-choice-container'>
            <div className='account-type-choice-content'>
                <div className='prompt'>
                    <p>اختر نوع الحساب</p>
                </div>
                <div className='choices'>
                    <a href="" className='account-type-card'>حرفي</a>
                    <a href="" className='account-type-card'>عميل</a>
                </div>
            </div>
        </div>
    );
}

export default AccountType;