import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import HistogramChart from './components/HistogramChart'


const studentGrades=[1,1,3]
const expertGrades=[2,2,4]

function App() {
  return (
    <div className="App">
      <HistogramChart L1={studentGrades} L2={expertGrades} />
    </div>
  )
}
export default App