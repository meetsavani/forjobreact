import React from 'react'

const loginPage = (props) => {

    let EmailId = null;
    let passwordValid = false;

    const handleInputChange = (event) => {
        if (event.target.name === 'emailId') {
            EmailId = event.target.value;
        }
        if (event.target.name === 'password') {
            if (props.password === event.target.value)
                passwordValid = true;
        }
        if (event.target.name === 'submit' && passwordValid === true) {
            props.function(EmailId, passwordValid)
        }
        console.log(passwordValid, EmailId, event.target.name);
        console.log(props.password);
    }

    return (
        <div>
            <label>
                EmailID:
                    <input type="text" name="emailId" onChange={handleInputChange} />
            </label>
            <label>
                Password:
                    <input type="text" name="password" onChange={handleInputChange} />
            </label>
            <button name="submit" onClick={handleInputChange}>Submit</button>
        </div >
    )
}

export default loginPage
