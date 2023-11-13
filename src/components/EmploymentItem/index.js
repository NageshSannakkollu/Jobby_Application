import './index.css'

const EmploymentItem = props => {
  const {employmentDetails, changeInEmploymentType} = props
  const {label, employmentTypeId} = employmentDetails

  const onClickEmploymentType = () => {
    changeInEmploymentType(employmentTypeId)
  }
  return (
    <li className="employment-item-list">
      <input
        type="checkbox"
        className="checkbox"
        onClick={onClickEmploymentType}
        id={label}
        value={label}
      />
      <label htmlFor={label} value={label}>
        {label}
      </label>
    </li>
  )
}
export default EmploymentItem
