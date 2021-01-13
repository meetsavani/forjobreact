import React from 'react'

const displayData = (props) => {
    return (
        <tbody>
            <tr>
                <th scope="row">{props.id}</th>
                <td>{props.email}</td>
                <td>{props.firstName}</td>
                <td>{props.lastName}</td>
                <td><img height="128" width="128" src={props.avatar} alt={props.avatar}></img></td>
                <td>
                    <button onClick={props.callUpdateModal.bind(this, props.id)}>update</button>
                    <button onClick={props.callDeleteModal.bind(this, props.id)}>delete</button>
                    <div>
                        {props.extra}
                    </div>
                    <div>
                        {props.job}
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default displayData
