import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import EntryForm from './components/EntryForm'
import PastEntries from './components/PastEntries'
import './App.css'

function App() {
  const [ entries, setEntries] = useState( JSON.parse(localStorage.getItem('entries')) || [
    {
      key: '2025-08-11',
      date: '2025-08-11',
      win1: 'Prebral knjigo',
      win2: 'Programiral 3 ure',
      win3: 'Poklical frenda'
    },
    {
      key: '2025-08-13',
      date: '2025-08-13',
      win1: 'Se ful učil',
      win2: 'Treniral na štangah',
      win3: 'Gledal serijo - relax'
    }
  ])
  const [ win1, setWin1 ] = useState('')
  const [ win2, setWin2 ] = useState('')
  const [ win3, setWin3 ] = useState('')
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [ isEditable, setIsEditable ] = useState(false)

  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries))
  }, [entries])

  return (
    <>
      <h1>🌟Daily Wins Journal</h1>
      <EntryForm 
        entries={entries} 
        setEntries={setEntries} 
        win1={win1}
        win2={win2}
        win3={win3}
        setWin1={setWin1}
        setWin2={setWin2}
        setWin3={setWin3}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
      />
      <PastEntries 
        entries={entries} 
        setEntries={setEntries}
        win1={win1}
        win2={win2}
        win3={win3}
        setWin1={setWin1}
        setWin2={setWin2}
        setWin3={setWin3}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
      />
    </>
  )
}

export default App
