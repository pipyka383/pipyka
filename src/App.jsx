import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import Mycompanent from './components/Mycompanent.jsx'
import Counter from './components/counter.jsx'
import Text from './components/Text.jsx'
import FriendsList from './components/TaskMeneger.jsx'

function App({name, age}) {
  const [count, setCount] = useState(0)
  return (
    <>
      <Mycompanent name={'Список задач'}></Mycompanent>
      <FriendsList></FriendsList>
    </>
  )
}

export default App
