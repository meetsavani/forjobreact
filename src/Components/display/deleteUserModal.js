import React from 'react'
import classes from './modal.module.css'
import Backdrop from './backdrop'

const modal = (props) => {

    const handleInputChange = (event) => {

        if (event.target.name === 'submit') {

            props.modalClosed("submit")

        }
    }

    return (
        <div>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal} style={{
                opacity: props.show ? '1' : '0',
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'
            }}>

                <button name="submit" onClick={handleInputChange}>Delete</button>

            </div>
        </div >
    );
}

export default modal
