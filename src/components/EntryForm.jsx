import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import DatePicker from 'react-datepicker'
import { Calendar } from 'lucide-react'
import "react-datepicker/dist/react-datepicker.css"
import './EntryForm.css'

function EntryForm({ entries, setEntries, win1, setWin1, win2, setWin2, win3, setWin3, selectedDate, setSelectedDate, isEditable, setIsEditable }) {
  const [ error, setError ] = useState('')

  function handleDateChange(date) {
    const newDate = dayjs(date).format('YYYY-MM-DD')
    setSelectedDate(date)
    setError('')
    const [ winsObjExist ] = entries.filter(entry => entry.date === newDate)
    if (winsObjExist) {
      setIsEditable(true)
    } else {
      setIsEditable(false)
    }
  }

  useEffect(() => {
    const selectedDateWins = entries.find((entry) => entry.date === selectedDate)
    if (selectedDateWins) {
      setWin1(selectedDateWins.win1)
      setWin2(selectedDateWins.win2)
      setWin3(selectedDateWins.win3)
    } else {
      setWin1('')
      setWin2('')
      setWin3('')
    }
  }, [selectedDate, entries, setWin1, setWin2, setWin3])

  function saveWins() {
    if ( !win1 || !win2 || !win3 ) {
      setError('Please enter all three wins before saving')
      return
    }
   
    const duplicates = entries.filter((entry) => entry.date === selectedDate)
    if (duplicates.length > 0) {
      setError('You already have wins saved for this date!')
      return
    }

    const newWins = {
      date: selectedDate,
      win1: win1,
      win2: win2,
      win3: win3
    }

    setEntries([
      ...entries,
      newWins
    ])
    setWin1('')
    setWin2('')
    setWin3('')
    setError('')
  }

  function updateWins() {
    setEntries(prevEntries => prevEntries.map(entry => {
      return entry.date === selectedDate ? { ...entry, win1:win1, win2:win2, win3:win3 } : entry
    }))
  }

  return (
    <>
      <div className="date-input-container">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
          className="date-input"
          calendarClassName="custom-calendar"
        />
        <Calendar className='input-calendar-icon' size={18} />
      </div>
      <h2>✏️What are your 3 wins today?</h2>
      <div className="inputs-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600'}}>1</span>
          <input 
            type='text' 
            style={{ flex: 1 }} 
            className='win-input'
            onChange={(event) => {
              setWin1(event.target.value)
              setError('')
            }}
            value={win1}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600'}}>2</span>
          <input 
            type='text' 
            style={{ flex: 1}} 
            className='win-input'
            onChange={(event) => {
              setWin2(event.target.value)
              setError('')
            }}
            value={win2}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
          <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600'}}>3</span>
          <input 
            type='text' 
            style={{ flex: 1}} 
            className='win-input'
            onChange={(event) => {
              setWin3(event.target.value)
              setError('')
            }}
            value={win3}
          />
        </div>
        {isEditable && <button className='update-btn' onClick={updateWins}>Update Wins</button>}
        {!isEditable && <button className='save-btn' onClick={saveWins}>Save Wins ✔️</button>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </>
  )
}

export default EntryForm;