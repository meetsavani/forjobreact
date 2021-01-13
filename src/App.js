import React, { Component } from 'react'
import styles from './App.module.css'
import LoginPage from './Components/display/loginPage'
import AuthorisedPage from './Components/functional/AuthorisedPage'

export default class App extends Component {

  state = {
    userId: {
      name: null,
      password: 'Admin@123'
    },
    isAuthorised: false
  }

  isAuthorisedHandler = (name, trueorfalse) => {
    this.setState({
      userId: {
        name: name,
        password: 'A'
      },
      isAuthorised: trueorfalse
    })
  }

  logoutHandler = () => {
    this.setState({
      isAuthorised: false
    })
  }

  render() {
    let displayContent = null;
    if (this.state.isAuthorised === false) {
      displayContent = (
        <LoginPage password={this.state.userId.password} function={this.isAuthorisedHandler} />
      )
    }
    if (this.state.isAuthorised === true) {
      displayContent = (
        <AuthorisedPage name={this.state.userId.name} logout={this.logoutHandler} />
      )
      // console.log(this.state);
    }

    return (
      <div className={styles.App}>
        {displayContent}
      </div>
    )
  }
}
