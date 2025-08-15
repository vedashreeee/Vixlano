import EditDesigner from './pages/EditDesigner.jsx'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx'
import BecomeDesigner from './pages/BecomeDesigner.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'

export default function App(){
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/c/:slug" element={<Category />} />
        <Route path="/become/:role" element={<BecomeDesigner />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit/:id" element={<EditDesigner />} />
      </Routes>
    </div>
  )
}
