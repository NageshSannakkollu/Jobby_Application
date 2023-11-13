import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    title,
    rating,
    location,
    jobDescription,
    id,
  } = similarJobDetails
  return (
    <li className="jobs-list-container" key={id}>
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h3>Description</h3>
      <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobsCard
