import React from 'react'
import {BrowserRouter , Routes  , Route} from 'react-router-dom'
// import CircleClock from './Component/Clock/CircleClock'
import DigitalClock from './Component/Clock/DigitalClock'
import CircleClock from './Component/Clock/CircleClock'
import Bingo from './Component/Bingo/Bingo'
import AllPages from './Component/AllPages'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<AllPages/>} />
        <Route path = '/clock' element = {<DigitalClock/>} />
        <Route path = '/bingo' element = {<Bingo/>} />
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
