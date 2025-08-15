import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { saveDesigner } from '../store/localStore'

export default function BecomeDesigner(){
  const { role } = useParams()
const nav = useNavigate()

// detect correct category
let defaultCategory = 'interior' // fallback
const currentPath = window.location.pathname

if (role === 'artist') {
  defaultCategory = 'art'
} else if (currentPath.includes('costume')) {
  defaultCategory = 'costume'
} else if (currentPath.includes('interior')) {
  defaultCategory = 'interior'
}

const [form, setForm] = useState({
  name: '',
  email: '',
  phone: '',
  studio: '',
  address: '',
  city: '',
  bio: '',
  photo: '',
  category: defaultCategory
})


  const onSubmit = (e) => {
    e.preventDefault()
    if(!form.name || !form.category) return alert('Please fill required fields.')
    const saved = saveDesigner(form)
    nav(`/profile/${saved.id}`)
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-2">{role==='artist' ? 'Become an Artist' : 'Become a Designer'}</h2>
      <p className="text-gray-600 mb-6">Create your public profile. Clients will be able to view, chat, and request bookings.</p>
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="label">Full Name *</div>
            <input className="input" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <div className="label">Category *</div>
            <select className="input" value={form.category} onChange={e=>setForm({...form, category: e.target.value})}>
              <option value="interior">Interior Designing</option>
              <option value="costume">Costume Designing</option>
              <option value="art">Art</option>
            </select>
          </div>
          <div>
            <div className="label">Studio/Boutique</div>
            <input className="input" value={form.studio} onChange={e=>setForm({...form, studio: e.target.value})} />
          </div>
          <div>
  <div className="label">Profile Photo *</div>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm({ ...form, photo: reader.result }); // Base64 image
        };
        reader.readAsDataURL(file);
      }
    }}
  />
</div>

          <div>
            <div className="label">Email</div>
            <input className="input" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <div className="label">Phone</div>
            <input className="input" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <div className="label">Address</div>
            <input className="input" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} />
          </div>
          <div>
            <div className="label">City</div>
            <input className="input" value={form.city} onChange={e=>setForm({...form, city: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <div className="label">Bio</div>
            <textarea className="input" rows="4" value={form.bio} onChange={e=>setForm({...form, bio: e.target.value})} />
          </div>
        </div>
        <button className="btn-primary" type="submit">Create Profile</button>
      </form>
    </main>
  )
}
