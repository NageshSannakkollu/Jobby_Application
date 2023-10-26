import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SkillsCard from '../SkillsCard'
import JobDetailsCard from '../JobDetailsCard'
import LifeAtCompanyCard from '../LifeAtCompanyCard'
import SimilarJobsItem from '../SimilarJobsItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    jobsItemList: [],
    similarJobsList: [],
    lifeAtCompanyList: [],
    skillsList: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getUpdatedData = job => ({
    id: job.id,
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
    companyWebsiteUrl: job.company_website_url,
    packagePerAnnum: job.package_per_annum,
  })

  getLifeAtCompanyData = job => ({
    description: job.description,
    imageUrl: job.image_url,
  })

  getSkillsData = skill => ({
    name: skill.name,
    imageUrl: skill.image_url,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedJobDetails = this.getUpdatedData(fetchedData.job_details)
      const similarJobsData = fetchedData.similar_jobs.map(eachJob =>
        this.getUpdatedData(eachJob),
      )
      const lifeAtCompanyData = this.getLifeAtCompanyData(
        fetchedData.job_details.life_at_company,
      )

      const skillsData = fetchedData.job_details.skills.map(eachSkill =>
        this.getSkillsData(eachSkill),
      )

      console.log(updatedJobDetails)
      console.log(similarJobsData)
      console.log(lifeAtCompanyData)
      console.log(skillsData)
      this.setState({
        jobsItemList: updatedJobDetails,
        similarJobsList: similarJobsData,
        lifeAtCompanyList: lifeAtCompanyData,
        skillsList: skillsData,
        apiStatus: apiConstants.success,
      })
    }
  }

  renderSkillsView = () => {
    const {skillsList} = this.state
    return (
      <div className="skills-list-container">
        {skillsList.map(eachSkill => (
          <SkillsCard skillsDetails={eachSkill} key={eachSkill.id} />
        ))}
      </div>
    )
  }

  renderLifeAtCompanyView = () => {
    const {lifeAtCompanyList} = this.state
    return (
      <div>
        {lifeAtCompanyList.map(eachCompany => (
          <LifeAtCompanyCard
            lifeAtCompanyDetails={eachCompany}
            key={eachCompany.id}
          />
        ))}
      </div>
    )
  }

  renderJobDetailsCardView = () => {
    const {jobsItemList} = this.state
    return (
      <div>
        {jobsItemList.map(eachItem => (
          <JobDetailsCard eachJobDetails={eachItem} key={eachItem.id} />
        ))}
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobsList} = this.state
    return (
      <ul className="ordered-similar-jobs">
        {similarJobsList.map(similarJob => (
          <SimilarJobsItem similarJobDetails={similarJob} key={similarJob.id} />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => (
    <div className="job-details-item-container">
      <Header />
      <div>
        <h3>Skills</h3>
        {this.renderSkillsView()}
        <h3>Life at Company</h3>
        <h3>Similar Jobs</h3>
        {this.renderSimilarJobs()}
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

export default JobItemDetails
