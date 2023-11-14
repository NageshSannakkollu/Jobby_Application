import './index.css'

const SalaryRangeItem = props => {
  const {salaryDetails, salaryChange} = props
  const {label, salaryRangeId} = salaryDetails

  const changeSalaryRange = () => {
    salaryChange(salaryRangeId)
  }

  return (
    <li className="employment-item-list" key={salaryRangeId}>
      <input
        type="radio"
        id={salaryRangeId}
        className="checkbox"
        onClick={changeSalaryRange}
        name={salaryDetails}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
export default SalaryRangeItem
