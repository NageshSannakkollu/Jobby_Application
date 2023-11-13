import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <ul className="header-list-items">
        <Link to="/">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="list-item">Jobs</li>
        </Link>
      </ul>
      <Link to="/login">
        <button type="button" className="logout-button" onClick={onClickLogout}>
          <li> Logout</li>
        </button>
      </Link>
    </nav>
  )
}
export default withRouter(Header)
