import './index.css'

const SalaryRangeItem = props => {
  const {salaryDetails, salaryChange} = props
  const {salaryRangeId, label} = salaryDetails

  const onChangeSalaryRange = () => {
    salaryChange(salaryRangeId)
  }

  return (
    <li key={salaryRangeId} className="salary-list-item" value={salaryRangeId}>
      <input
        type="radio"
        id="input-radio"
        onChange={onChangeSalaryRange}
        value={salaryRangeId}
      />
      <label htmlFor="input-radio">{label}</label>
    </li>
  )
}

export default SalaryRangeItem
