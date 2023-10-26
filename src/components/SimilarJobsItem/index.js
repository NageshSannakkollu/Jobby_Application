import {ImLocation} from 'react-icons/im'
import {BsBagFill} from 'react-icons/bs'

import './index.css'

const SimilarJobsItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    jobDescription,
    employmentType,
  } = similarJobDetails

  return (
    <li className="similar-jobs-container">
      <div className="company-logo-title-rating-container">
        <img src={companyLogoUrl} alt={title} className="company-logo-image" />
        <div className="title-rating-container">
          <h3 className="title">{title}</h3>
          <div className="star-rating-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-filled-img.png"
              alt="star"
              className="rating-star-image"
            />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h3>Description</h3>
      <p>{jobDescription}</p>
      <div className="location-employment-type-container">
        <div className="location-container">
          <ImLocation />
          <p>{location}</p>
        </div>
        <div className="location-container">
          <BsBagFill />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsItem
