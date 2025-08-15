
import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDesignersByCategory } from '../store/localStore'
import DesignerCard from '../components/DesignerCard'

const labels = {
  interior: { title: 'Interior Designing', role: 'designer' },
  costume: { title: 'Costume Designing', role: 'designer' },
  art: { title: 'Art', role: 'artist' },
}

export default function Category(){
  const { slug } = useParams()
  const [q, setQ] = useState('')
  const list = useMemo(()=> getDesignersByCategory(slug).filter(d => (d.name||'').toLowerCase().includes(q.toLowerCase()) || (d.city||'').toLowerCase().includes(q.toLowerCase())), [slug, q])

  const meta = labels[slug] || {title: 'Category'}
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">{meta.title}</h2>
        <Link to={`/become/${meta.role}`} className="btn-primary">{meta.role==='artist' ? 'Become an Artist' : 'Become a Designer'}</Link>
      </div>
      <div className="mb-6 flex gap-3">
        <input className="input" placeholder="Search by name or city..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {list.map(d => <DesignerCard key={d.id} d={d} />)}
        {list.length===0 && (
          <div className="text-gray-600">No profiles yet in this category. Be the first to <Link to={`/become/${meta.role}`} className="underline">create one</Link>.</div>
        )}
      </div>
    </main>
  )
}
