import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import EmploymentItem from '../EmploymentItem'
import SalaryRangeItem from '../SalaryRangeItem'
import JobItem from '../JobItem'

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

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    activeEmployeeType: employmentTypesList[0].employmentTypeId,
    activeSalary: salaryRangesList[0].salaryRangeId,
    jobsList: [],
    searchInput: '',
    profileDataList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  changeInEmploymentType = employmentTypeId => {
    this.setState({activeEmployeeType: employmentTypeId}, this.getJobs)
  }

  salaryChange = salaryRangeId => {
    this.setState({activeSalary: salaryRangeId}, this.getJobs)
  }

  getJobs = async () => {
    const {activeEmployeeType, activeSalary, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeeType}&minimum_package=${activeSalary}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachData => ({
        id: eachData.id,
        companyLogoUrl: eachData.company_logo_url,
        location: eachData.location,
        employmentType: eachData.employment_type,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
        jobDescription: eachData.job_description,
      }))
      console.log(updatedData)
      this.setState({jobsList: updatedData})
    }
  }

  getUpdatedProfileData = eachOne => ({
    name: eachOne.name,
    profileImageUrl: eachOne.profile_image_url,
    shortBio: eachOne.short_bio,
  })

  getProfileDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = ' https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const profileData = await response.json()
      const fetchedData = this.getUpdatedProfileData(
        profileData.profile_details,
      )
      console.log(fetchedData)
      this.setState({
        profileDataList: fetchedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getJobs)
  }

  reloadProfileDetails = () => {
    this.getProfileDetails()
  }

  renderProfileSuccessView = () => {
    const {profileDataList} = this.state
    return (
      <div className="profile-container">
        <img
          src={profileDataList.profileImageUrl}
          alt={profileDataList.name}
          className="profile-picture"
        />
        <h1 className="profile-name">{profileDataList.name}</h1>
        <p className="profile-short-bio">{profileDataList.shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="retry-button-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.reloadProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={40} width={40} />
    </div>
  )

  renderProfileItemData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderProfileSuccessView()
      case apiConstants.failure:
        return this.renderProfileFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmployeeType, activeSalary, jobsList, searchInput} = this.state
    console.log(activeEmployeeType, activeSalary)
    const jobsListLength = jobsList.length
    console.log(jobsListLength)

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-inside-container">
          <div className="profile-employment-type-salary-container">
            <hr />
            <div className="profile-details-container">
              {this.renderProfileItemData()}
            </div>
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
          <div className="search-jobs-list-container">
            <div className="search-input-icon-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {jobsListLength > 0 ? (
              <ul className="list-of-jobs-container">
                {jobsList.map(eachJob => (
                  <JobItem jobDetails={eachJob} key={eachJob.id} />
                ))}
              </ul>
            ) : (
              <div className="failure-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                  alt="failure view"
                  className="failure-image"
                />
                <h1>Oops! Something Went Wrong</h1>
                <p>We cannot seem to find the page you looking for</p>
                <button type="button" className="retry-button">
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
