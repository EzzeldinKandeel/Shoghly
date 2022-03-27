import React from "react";

function WorkerSignup() {
    return (
        <div className="form">
            <form>
                <div className="input-container">
                    <label>الاسم الأول: </label>
                    <input type="text" name="first-name" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>الاسم الأخير: </label>
                    <input type="text" name="last-name" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>البريد الإلكتروني: </label>
                    <input type="email" name="email" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>المحافظة: </label>
                    <input type="text" name="city" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>الحرفة: </label>
                    <input type="text" name="profession" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>الرقم السري: </label>
                    <input type="password" name="password" className="input-box" required />
                </div>
                <div className="input-container">
                    <label>تأكيد على الرقم السري: </label>
                    <input type="password" name="password-repeat" className="input-box" required />
                </div>
                <div className="button-container multiple-horizontal-buttons">
                    <input type="submit" value="تسجيل" className="main-button signup-submit"/>
                    <input type="submit" value="إلغاء" className="main-button signup-cancel"/>
                </div>
            </form>
        </div>
    );
}

export default WorkerSignup;