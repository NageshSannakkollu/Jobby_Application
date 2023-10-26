import './index.css'

const SkillsCard = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails
  console.log(skillsDetails)
  return (
    <div className="skills-list">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name"> {name}</p>
    </div>
  )
}

export default SkillsCard
