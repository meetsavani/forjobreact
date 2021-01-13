import React from 'react'

const header = (props) => {

    return (
        <div>
            <h3>Hello {props.name}</h3>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    {props.name.charAt(0)}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li onClick={props.logout}>logout</li>
                </ul>
            </div>
        </div>
    )
}

export default header
