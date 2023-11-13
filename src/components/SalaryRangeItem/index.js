import './index.css'

const SalaryRangeItem = props => {
  const {salaryDetails, salaryChange} = props
  const {label, salaryRangeId} = salaryDetails

  const changeSalaryRange = () => {
    salaryChange(salaryRangeId)
  }

  return (
    <li className="employment-item-list">
      <input
        type="radio"
        id={salaryRangeId}
        className="checkbox"
        onClick={changeSalaryRange}
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId} value={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}
export default SalaryRangeItem
