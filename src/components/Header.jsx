import { Link, useLocation } from 'react-router-dom'

export default function Header(){
  const loc = useLocation();
  const path = loc.pathname;
  const isHome = path === '/';
  const roleFromCategory = () => {
    if(path.startsWith('/c/interior')) return 'designer';
    if(path.startsWith('/c/costume')) return 'designer';
    if(path.startsWith('/c/art')) return 'artist';
    return null;
  }
  const role = roleFromCategory();
  return (
    <header className="sticky top-0 z-10 bg-cream/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight" style={{letterSpacing: '-0.02em'}}>
          <span className="font-bold text-2xl">Vixlano</span>


        </Link>
        <nav className="flex items-center gap-3">
          {!isHome && role && (
            <Link to={`/become/${role}`} className="btn-primary">
              {role === 'artist' ? 'Become an Artist' : 'Become a Designer'}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
