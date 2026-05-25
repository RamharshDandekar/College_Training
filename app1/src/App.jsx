import './App.css'
import StudentCard from './StudentCard'

function App() {
  // Variables
  const name = 'ram'
  const age = 25
  const isStudent = true
  const hasFees = true
  const city = 'New Delhi'
  const marks = 85

  return (
    <>
      <h2>{name.toUpperCase()}</h2>
      <p>Age: {age}</p>
      
      {isStudent ? <p>Currently Studying</p> : <p>Working Professional</p>}
      
      {hasFees && <button>Pay Fees</button>}
      
      <p>City: {city}</p>
      
      <p>{marks > 80 ? 'Passed' : 'Failed'}</p>

      <hr />

      <StudentCard name="Ayesha" age={20} city="Pune" />
      <StudentCard name="Ravi" age={21} city="Mumbai" />
      <StudentCard name="Priya" age={19} city="Nagpur" />
    </>
  )
}

export default App
