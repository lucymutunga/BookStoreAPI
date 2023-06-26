import React, { useState } from 'react';

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({ memberID: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {error !== "" ? <div className="error">{error}</div> : ""}
                <div className="form-group">
                    <label htmlFor="memberID">Member ID:</label>
                    <input type="text" name="memberID" id="memberID" onChange={e => setDetails({ ...details, memberID: e.target.value })} value={details.memberID}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password}/>
                </div>
            </div>
            <input type="submit" value="LOGIN"/>
        </form>
    );
}

export default LoginForm;
