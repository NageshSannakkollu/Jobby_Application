import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    packagePerAnnum,
    rating,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="jobs-link">
      <li className="jobs-list-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h3>Description</h3>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
