
import { Link } from 'react-router-dom'

export default function DesignerCard({ d }){
  return (
    <div className="card p-4 flex gap-4">
      <img src={d.photo || 'https://via.placeholder.com/120x120?text=V'} alt={d.name} className="w-24 h-24 rounded-xl object-cover"/>
      <div className="flex-1">
        <h4 className="text-lg font-semibold">{d.name}</h4>
        <p className="text-gray-600">{d.studio} • {d.city}</p>
        <p className="text-gray-700 mt-1 line-clamp-2">{d.bio}</p>
        <div className="mt-3 flex gap-2">
          <a href={`mailto:${d.email}`} className="btn-outline">Email</a>
          <a href={`tel:${d.phone}`} className="btn-outline">Call</a>
          <Link to={`/profile/${d.id}`} className="btn-primary">View Profile</Link>
        </div>
      </div>
    </div>
  )
}
