
import { useState } from 'react'
import { addBooking } from '../store/localStore'

export default function BookingForm({ designer }){
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  const onBook = () => {
    if(!name || !date) return alert('Please fill your name and date.')
    addBooking({ designerId: designer.id, clientName: name, date, notes })
    alert('Booking request submitted! (Demo)')
    setName(''); setDate(''); setNotes('')
  }

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold">Book {designer.name}</h3>
      <div className="mt-3 space-y-3">
        <div>
          <div className="label">Your Name</div>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <div className="label">Preferred Date</div>
          <input type="date" className="input" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div>
          <div className="label">Notes</div>
          <textarea className="input" rows="3" value={notes} onChange={e=>setNotes(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={onBook}>Send Booking Request</button>
      </div>
    </div>
  )
}
