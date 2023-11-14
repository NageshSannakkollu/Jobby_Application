import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetailsList: {},
    skillsList: {},
    lifeAtCompanyList: {},
    similarJobsList: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    location: data.location,
    jobDescription: data.job_description,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    rating: data.rating,
    packagePerAnnum: data.package_per_annum,
    employmentType: data.employment_type,
  })

  getFormattedSkills = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  getFormattedLifeAtCompany = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  renderLoadingView = () => (
    <div className="loading" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height={80} width={80} />
    </div>
  )

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const similarJobs = fetchedData.similar_jobs.map(data =>
        this.getFormattedData(data),
      )
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const skillsRequired = fetchedData.job_details.skills.map(data =>
        this.getFormattedSkills(data),
      )
      const lifeAtCompany = this.getFormattedLifeAtCompany(
        fetchedData.job_details.life_at_company,
      )
      console.log(fetchedData)
      this.setState({
        jobDetailsList: updatedData,
        skillsList: skillsRequired,
        lifeAtCompanyList: lifeAtCompany,
        similarJobsList: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      jobDetailsList,
      skillsList,
      lifeAtCompanyList,
      similarJobsList,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      title,
      location,
      rating,
    } = jobDetailsList

    const {imageUrl, description} = lifeAtCompanyList

    return (
      <div className="job-description-container">
        <div className="job-description-inside-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment-package-container">
            <div className="location-employment-container">
              <div className="location-container">
                <p className="location">{location}</p>
                <div className="employment-container">
                  <BsBriefcaseFill />
                  <p className="employment-type">{employmentType}</p>
                </div>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-visit-container">
            <h4>Description</h4>
            <a
              href={companyWebsiteUrl}
              target="blank"
              className="visit-anchor-element"
            >
              Visit
              <span>
                <BsBoxArrowUpRight className="visit-box" />
              </span>
            </a>
          </div>
          <p>{jobDescription}</p>
          <h3>Skills</h3>
          <ul className="skills-card">
            {skillsList.map(eachSkill => (
              <SkillsCard skillsDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h3>Life At Company</h3>
          <div className="life-at-company-details">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="company-image"
            />
          </div>
        </div>
        <h2 className="similar-jobs-heading">Similar Jobs</h2>
        <ul className="similar-jobs-container">
          {similarJobsList.map(similar => (
            <SimilarJobsCard similarJobDetails={similar} key={similar.id} />
          ))}
        </ul>
      </div>
    )
  }

  clickOnRetryButton = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.clickOnRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderJobsDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    // console.log(jobDetailsList)
    // console.log(skillsList)
    // console.log(lifeAtCompanyList)
    // console.log(similarJobsList)

    return (
      <div>
        <Header />
        {this.renderJobsDetails()}
      </div>
    )
  }
}

export default JobItemDetails
