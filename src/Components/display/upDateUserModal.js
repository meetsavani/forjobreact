import React from 'react'
import classes from './modal.module.css'
import Backdrop from './backdrop'

const modal = (props) => {

    let EmailId = null;
    let firstName = null;
    let lastName = null;
    let job = null;
    const handleInputChange = (event) => {
        if (event.target.name === 'firstName') {
            firstName = event.target.value;
        }
        if (event.target.name === 'lastName') {
            lastName = event.target.value;
        }
        if (event.target.name === 'emailId') {
            EmailId = event.target.value;
        }
        if (event.target.name === 'job') {
            job = event.target.value;
        }
        if (event.target.name === 'submit' && EmailId !== null && firstName !== null && lastName !== null && job !== null) {


            props.modalClosed(firstName, lastName, EmailId, job, "submit")
            // console.log("tata");
        }
        // console.log(firstName, lastName, Job, EmailId, event.target.name);
    }

    // console.log(props.data);
    return (
        <div>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal} style={{
                opacity: props.show ? '1' : '0',
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
                <label>
                    ID:
                    <input type="text" value={props.data.id} disabled />
                </label>
                <label>
                    First Name:
                    <input type="text" placeholder={props.data.first_name} name="firstName" onChange={handleInputChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" placeholder={props.data.last_name} name="lastName" onChange={handleInputChange} />
                </label>
                <label>
                    Email ID:
                    <input type="text" placeholder={props.data.email} name="emailId" onChange={handleInputChange} />
                </label>
                <label>
                    Job:
                    <input type="text" placeholder={props.data.job} name="job" onChange={handleInputChange} />
                </label>
                <button name="submit" onClick={handleInputChange}>Submit</button>

            </div>
        </div >
    );
}

export default modal
