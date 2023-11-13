import './index.css'

const SkillsCard = props => {
  const {skillsDetails} = props
  const {name, imageUrl} = skillsDetails

  return (
    <li className="skills-list-item">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p>{name}</p>
    </li>
  )
}

export default SkillsCard
