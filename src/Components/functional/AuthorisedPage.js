import React, { Component } from 'react'
import Header from '../display/header'
import Footer from '../display/footer'
import axios from 'axios'
import DisplayData from '../display/displayData'
import AddUserModal from '../display/addUserModal'
import UpdateUserModal from '../display/upDateUserModal'
import DeleteUserModal from '../display/deleteUserModal'

export default class AuthorisedPage extends Component {

    state = {
        data: [],
        loadedFirstTime: false,
        updateUserModal: false,
        addUserModal: false,
        selectedIdTOUpdate: null,
        deleteUserModal: null
    }

    search = (ids, myArray) => {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].id === ids) {
                return myArray[i];
            }
        }
    }

    componentDidMount() {
        if (this.state.loadedFirstTime === false) {
            for (let a = 1; a < 3; a++) {
                axios.get('https://reqres.in/api/users?page=' + a)
                    .then((response) => {
                        // handle success
                        let data = [...this.state.data];
                        response.data.data.map((res) => {
                            return data.push(res)
                        })
                        this.setState({
                            data: data
                        })
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
                if (a === 2) {
                    this.setState({
                        loadedFirstTime: true
                    })
                }
            }
        }
    }

    closeModalForAddUserModal = (firstName, lastName, EmailId, Job, sub) => {
        this.setState({ addUserModal: false })
        // console.log(firstName, lastName, EmailId, Job);
        if (sub === "submit") {
            axios.post('https://reqres.in/api/users', {
                name: firstName,
                job: Job
            })
                .then((response) => {
                    let dataNow = {
                        id: response.data.id,
                        email: EmailId,
                        first_name: firstName,
                        last_name: lastName,
                        extra: response.data.createdAt,
                        job: Job
                    }
                    let DataBlock = [...this.state.data];
                    DataBlock.push(dataNow);
                    this.setState({
                        data: DataBlock
                    })
                    // console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    closeModalForUpdateUserModal = (firstName, lastName, EmailId, Job, sub) => {
        this.setState({ updateUserModal: false })
        // console.log(firstName, lastName, EmailId, Job);

        if (sub === "submit") {

            let dataBlocks = this.search(this.state.selectedIdTOUpdate, this.state.data)

            // console.log(dataBlocks);
            axios.post('https://reqres.in/api/users' + dataBlocks.id, {
                name: firstName,
                job: Job
            })
                .then((response) => {
                    // let dataNow = {
                    //     id: response.data.id,
                    //     email: EmailId,
                    //     first_name: firstName,
                    //     last_name: lastName,
                    //     extra: response.data.updatedAt,
                    //     job: Job
                    // }

                    let DataBlock = [...this.state.data];

                    for (var i = 0; i < DataBlock.length; i++) {
                        if (DataBlock[i].id === dataBlocks.id) {
                            DataBlock.splice(i, 1);
                        }
                    }

                    dataBlocks.first_name = firstName;
                    dataBlocks.last_name = lastName;
                    dataBlocks.email = EmailId;
                    dataBlocks.job = Job;

                    DataBlock.push(dataBlocks)

                    this.setState({
                        data: DataBlock
                    })
                    // console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    closeModalForUpdateDeleteModal = (sub) => {
        this.setState({ updateUserModal: false })
        // console.log(firstName, lastName, EmailId, Job);

        if (sub === "submit") {

            let dataBlocks = this.search(this.state.selectedIdTOUpdate, this.state.data)

            axios.post('https://reqres.in/api/users' + dataBlocks.id)
                .then((response) => {

                    let DataBlock = [...this.state.data];

                    for (var i = 0; i < DataBlock.length; i++) {
                        if (DataBlock[i].id === dataBlocks.id) {
                            DataBlock.splice(i, 1);
                        }
                    }
                    this.setState({
                        data: DataBlock
                    })
                    // console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    showModalToAddUserModal = () => {
        this.setState({ addUserModal: true })
    }

    showModalToUpdateUserModal = (idRecieved) => {
        this.setState({
            updateUserModal: true,
            selectedIdTOUpdate: idRecieved
        })
    }

    showModalToDelete = (idRecieved) => {
        this.setState({
            deleteUserModal: idRecieved
        })
    }

    render() {

        // console.log(this.state.data);
        let dataToBePassed = this.search(this.state.selectedIdTOUpdate, this.state.data)

        this.state.data.sort((a, b) => { return a.id - b.id; });
        const dataToDisplay = this.state.data.map((res) => {
            return <DisplayData key={res.id} id={res.id} email={res.email} firstName={res.first_name} lastName={res.last_name} avatar={res.avatar} callDeleteModal={this.showModalToDelete} callUpdateModal={this.showModalToUpdateUserModal} extra={res.extra} job={res.job} />
        })

        let updateUserModal = null;
        if (this.state.updateUserModal === true)
            updateUserModal = (<UpdateUserModal show={this.state.updateUserModal} modalClosed={this.closeModalForUpdateUserModal} data={dataToBePassed} />)

        let addUserModal = null;
        if (this.state.addUserModal === true)
            updateUserModal = (<AddUserModal show={this.state.addUserModal} modalClosed={this.closeModalForAddUserModal} id={this.state.data.length} />)

        let deleteUserModal = null;
        if (this.state.addUserModal === true)
            updateUserModal = (<DeleteUserModal show={this.state.deleteUserModal} modalClosed={this.closeModalForUpdateDeleteModal} id={this.state.data.length} />)



        return (
            <div>
                <Header name={this.props.name} logout={this.props.logout} />

                <button onClick={this.showModalToAddUserModal} className="btn btn-primary">
                    Add New User
                </button>

                {addUserModal}

                {updateUserModal}

                {deleteUserModal}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">First_Name</th>
                            <th scope="col">Last_Name</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    {dataToDisplay}
                </table>

                <Footer />
            </div >
        )
    }
}
