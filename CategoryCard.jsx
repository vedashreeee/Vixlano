import { Link } from 'react-router-dom'
import interiorImg from '../assets/interior.png'
import costumeImg from '../assets/costume.png'
import artImg from '../assets/art.png'

export default function CategoryCard({ slug, title, desc, accent }) {
  const getImage = () => {
    if (slug === 'interior') return interiorImg
    if (slug === 'costume') return costumeImg
    if (slug === 'art') return artImg
    return null
  }
  const img = getImage()

  return (
    <Link to={`/c/${slug}`} className="card p-6 block hover:shadow-lg transition">
      {img ? (
        <img
          src={img}
          alt={title}
          className="h-36 w-full object-cover rounded-xl mb-4"
        />
      ) : (
        <div className="h-36 rounded-xl mb-4" style={{ background: accent }} />
      )}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-1">{desc}</p>
    </Link>
  )
}
