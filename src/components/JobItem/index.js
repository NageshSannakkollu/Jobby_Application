import {ImLocation} from 'react-icons/im'
import {BsBagFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    location,
    jobDescription,
    title,
    packagePerAnnum,
    employmentType,
    rating,
    companyLogoUrl,
  } = jobDetails

  const getFinalPackage = packageAnnum => {
    if (packageAnnum[1] === 'LPA') {
      return packageAnnum[0] * 100000
    }
    return null
  }
  const packageAnnum = packagePerAnnum.split(' ')
  const finalPackage = getFinalPackage(packageAnnum)
  console.log(finalPackage)

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="jobs-list" key={id}>
        <div className="company-logo-title-rating-container">
          <img
            src={companyLogoUrl}
            alt={title}
            className="company-logo-image"
          />
          <div className="title-rating-container">
            <h3>{title}</h3>
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
        <div className="location-type-package-container">
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
          <p>{packagePerAnnum}/-</p>
        </div>
        <hr />
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
