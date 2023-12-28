import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMessage: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMessage: errorMsg})
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="input-name">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          className="user-input"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="input-name">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="user-input"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMessage} = this.state
    console.log(showErrorMsg, errorMessage)
    return (
      <div className="app-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">{this.renderUserName()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">*{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
