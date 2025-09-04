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
      win1: 'Went for a 30-minute walk',
      win2: 'Completed an online course module',
      win3: 'Cleaned and organized my workspace'
    },
    {
      key: '2025-08-13',
      date: '2025-08-13',
      win1: 'Worked on my hobby project',
      win2: 'Updated my expense tracking',
      win3: 'Decluttered my email inbox'
    }
  ])
  const [ win1, setWin1 ] = useState('')
  const [ win2, setWin2 ] = useState('')
  const [ win3, setWin3 ] = useState('')
  const [ selectedDate, setSelectedDate ] = useState(dayjs().toDate())
  const [ isEditable, setIsEditable ] = useState(false)

  useEffect(() => {
    console.log(selectedDate)
  }, [selectedDate])
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
