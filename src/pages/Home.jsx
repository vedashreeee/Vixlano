import CategoryCard from '../components/CategoryCard'
import logo from '../assets/logo.png'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center gap-6">
          {/* Logo */}
          <img
            src={logo}
            alt="VL Logo"
            className="h-32 w-32 object-contain"
          />
          {/* Title + Tagline */}
          <div
            className="flex flex-col items-start"
            style={{ marginLeft: '-37px' }} // 1 cm shift left
          >
            <h1 className="text-5xl font-extrabold tracking-tight">
              Vixlano
            </h1>
            <p className="text-gray-600 mt-1 text-left">
              Where designers and artists meet clients.
            </p>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section
        className="grid md:grid-cols-3 gap-6 pb-20"
        style={{ marginTop: '-23px' }} // Lift up 0.6 cm
      >
        <CategoryCard
          slug="interior"
          title="Interior Designing"
          desc="Spaces that feel like you."
          accent="linear-gradient(135deg,#E4D7FF,#C7E9E4)"
        />
        <CategoryCard
          slug="costume"
          title="Costume Designing"
          desc="Wardrobes crafted with care."
          accent="linear-gradient(135deg,#FADADD,#FFD1B3)"
        />
        <CategoryCard
          slug="art"
          title="Art"
          desc="Original art & commissions."
          accent="linear-gradient(135deg,#FFF5E6,#E4D7FF)"
        />
      </section>
    </main>
  )
}
