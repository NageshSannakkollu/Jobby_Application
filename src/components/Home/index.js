import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  clickToFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-container">
        <Header />
        <div className="home-inside-container">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary <br />
            information, company reviews. Find the job that fits your <br />
            abilities and potential.
          </p>
          <button
            type="button"
            className="find-jobs-button"
            onClick={this.clickToFindJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}
export default Home
