import dayjs from 'dayjs'
import { useState } from 'react'
import PastEntry from './PastEntry'

function PastEntries({ entries, setEntries, setWin1, setWin2, setWin3, setSelectedDate, setIsEditable }) {
  const [ showEntries, setShowEntries ] = useState(2)

  const sortedEntriesArr = [...entries].sort((a, b) => {
    return dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
  })

  function loadMoreEntries() {
    setShowEntries(prevEntries => prevEntries + 3)
  }

  function handleEdit(id) {
    const { win1, win2, win3, date } = entries.find(entry => entry.date === id)
    setWin1(win1)
    setWin2(win2)
    setWin3(win3)
    setSelectedDate(date)
    setIsEditable(true)
  }
 
  function handleDelete(id) {
    setEntries(prevEntries => prevEntries.filter((prevEntry) => prevEntry.date !== id))
  }
  
  return (
    <>
      <h2 style={{ textAlign: 'left' }}>Past Entries</h2>
      {sortedEntriesArr.slice(0, showEntries).map((entry) => {
        return (
          <PastEntry 
            key={entry.date}
            date={entry.date}
            win1={entry.win1}
            win2={entry.win2}
            win3={entry.win3}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )
      })}
      { entries.length > 2 && showEntries < entries.length && <button 
        style={{
          background: 'none',
          fontSize: '15px',
          border: 'none',
          fontWeight: '500',
          textDecoration: 'underline',
        }}
        onClick={loadMoreEntries}
      >Load more</button> }
    </>
  )
}

export default PastEntries