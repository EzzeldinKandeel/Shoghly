import React from "react";
import "../styles/signup.css"
import "../styles/login.css"
import {Link} from 'react-router-dom'
import { getData } from "../data";

function WorkerSignupBox() {
    
    const data = getData()
    const [signupData, setSignupData] = React.useState(
            {
                firstName: "",
                lastName: "",
                email: "",
                city: "",
                profession: "",
                mobileNumber: "",
                birthDate: "",
                password: "",
                passwordConfirm: ""
            }
        )
    
        function handleChange(event) {
            const {name, value} = event.target
            setSignupData(prevSignupData => {
                return {
                    ...prevSignupData, [name]: value
                }
            })
        }
    
        function handleSubmit(event) {
            event.preventDefault()
        }
        
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>الاسم الأول: </label>
                    <input 
                        type="text" 
                        name="firstName"
                        value={signupData.firstName}
                        onChange={handleChange} 
                        className="input-box" 
                        required 
                    />
                </div>
                <div className="input-container">
                    <label>الاسم الأخير: </label>
                    <input 
                        type="text" 
                        name="lastName"
                        value={signupData.lastName}
                        onChange={handleChange} 
                        className="input-box" 
                        required 
                    />
                </div>
                <div className="input-container">
                    <label>البريد الإلكتروني: </label>
                    <input 
                        type="email" 
                        name="email"
                        value={signupData.email}
                        onChange={handleChange} 
                        className="input-box" 
                        required 
                    />
                </div>
                <div className="input-container">
                    <label>المحافظة: </label>
                    <input 
                        type="text" 
                        name="city"
                        value={signupData.city}
                        onChange={handleChange} 
                        className="input-box" 
                        required 
                    />
                </div>
                <div className="input-container">
                    <label>الحرفة: </label>
                    <select 
                        name="profession"
                        value={signupData.profession}
                        onChange={handleChange} 
                        className="input-box"
                    >
                        <option value="">-- إختر --</option>
                        {data.professions.map(profession => (
                            <option value={profession.english_name}>{profession.arabic_name}</option>
                        ))}
                    </select>
                </div>
                <div className="input-container">
                    <label>رقم المحمول: </label>
                    <input 
                        type="tel" 
                        name="mobileNumber"
                        value={signupData.mobileNumber}
                        onChange={handleChange} 
                        className="input-box" 
                        required 
                    />
                </div>
                <div className="input-container">
                    <label>تاريخ الميلاد: </label>
                    <input 
                        type="date" 
                        name="birthDate"
                        value={signupData.birthDate}
                        onChange={handleChange} 
                        className="input-box" 
                        required 
                    />
                </div>
                <div className="input-container">
                    <label>الرقم السري: </label>
                    <input 
                        type="password" 
                        name="password"
                        value={signupData.password}
                        onChange={handleChange} 
                        className="input-box" 
                        required 
                    />
                </div>
                <div className="input-container">
                    <label>تأكيد على الرقم السري: </label>
                    <input 
                        type="password" 
                        name="passwordConfirm"
                        value={signupData.passwordConfirm}
                        onChange={handleChange} 
                        className="input-box" 
                        required 
                    />
                </div>
                <div className="button-container multiple-horizontal-buttons">
                    <input 
                        type="submit" value="تسجيل" className="main-button signup-submit"/>
                    <Link to='/' className="main-button signup-cancel">إلغاء</Link>
                </div>
            </form>
        </div>
    );
}

export default WorkerSignupBox;