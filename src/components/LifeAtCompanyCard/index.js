import './index.css'

const LifeAtCompanyCard = props => {
  const {lifeAtCompanyDetails} = props
  const {imageUrl, description} = lifeAtCompanyDetails
  return (
    <div className="company-life-container">
      <p>{description}</p>
      <img src={imageUrl} alt="company logo" className="company-life-image" />
    </div>
  )
}

export default LifeAtCompanyCard
