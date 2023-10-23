import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmploymentItem from '../EmploymentItem'
import SalaryRangeItem from '../SalaryRangeItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Home extends Component {
  state = {
    activeEmployeeType: employmentTypesList[0].employmentTypeId,
    activeSalary: salaryRangesList[0].salaryRangeId,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  changeInEmploymentType = employmentTypeId => {
    this.setState({activeEmployeeType: employmentTypeId})
  }

  salaryChange = salaryRangeId => {
    this.setState({activeSalary: salaryRangeId})
  }

  renderRetryButton = () => (
    <div>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  getEachData = eachData => {
    console.log(eachData)
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = ' https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
    } else {
      this.renderRetryButton()
    }
  }

  render() {
    const {activeEmployeeType, activeSalary} = this.state
    console.log(activeEmployeeType, activeSalary)
    return (
      <div className="home-container">
        <Header />
        <div>
          <div className="profile-container">
            <h1>Sanjay</h1>
            <p>shortBio</p>
          </div>
          <hr />
          <div>
            <h3>Type of Employment</h3>
            <ul className="employment-list">
              {employmentTypesList.map(eachEmployee => (
                <EmploymentItem
                  employmentDetails={eachEmployee}
                  key={eachEmployee.employmentTypeId}
                  changeInEmploymentType={this.changeInEmploymentType}
                />
              ))}
            </ul>
            <hr />
            <h3>Salary Range</h3>
            <ul className="employment-list">
              {salaryRangesList.map(eachSalary => (
                <SalaryRangeItem
                  salaryDetails={eachSalary}
                  key={eachSalary.salaryRangeId}
                  salaryChange={this.salaryChange}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
