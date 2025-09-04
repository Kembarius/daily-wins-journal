import dayjs from 'dayjs'
import { FileEdit, X } from 'lucide-react'
import './PastEntry.css'

function PastEntry({ win1, win2, win3, date, onDelete, onEdit }) {
  return (
  <div className="entry-card">
    <button className="edit-btn" onClick={() => onEdit(date)} >
      <FileEdit size={18} color='#646cff' className='edit-icon' />
    </button>
    <button className="delete-btn" onClick={() => onDelete(date)}>
      <X size={20} color='#646cff' className='delete-icon' />
    </button>
    <p className="entry-date">{dayjs(date).format("ddd, MMM D, YYYY")}</p>
    <ul className="entry-list">
      <li>{win1}</li>
      <li>{win2}</li>
      <li>{win3}</li>
    </ul>
  </div>
  )
}

export default PastEntry