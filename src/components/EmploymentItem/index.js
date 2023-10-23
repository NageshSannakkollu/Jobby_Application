import './index.css'

const EmploymentItem = props => {
  const {employmentDetails, changeInEmploymentType} = props
  const {label, employmentTypeId} = employmentDetails

  const onChangeEmploymentType = () => {
    changeInEmploymentType(employmentTypeId)
  }

  return (
    <li className="employment-type-list" key={employmentTypeId}>
      <input
        type="checkbox"
        id="checkbox-input"
        onChange={onChangeEmploymentType}
        value={employmentTypeId}
      />
      <label htmlFor="checkbox-input">{label}</label>
    </li>
  )
}

export default EmploymentItem
