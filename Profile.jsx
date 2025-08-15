import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getDesigner,
  deleteDesigner,
  addDesignerWork,
  deleteDesignerWork,
  updateDesignerWork,
  saveDesigner
} from '../store/localStore'
import ChatBox from '../components/ChatBox'
import BookingForm from '../components/BookingForm'

export default function Profile() {
  const { id } = useParams()
  const nav = useNavigate()
  const d = useMemo(() => getDesigner(id), [id])

  const [profileFileName, setProfileFileName] = useState("")
  const [workFileNames, setWorkFileNames] = useState([])

  if (!d) return <main className="max-w-4xl mx-auto px-4 py-8">Profile not found.</main>

  // Check if current browser owns this profile
  const isOwner = localStorage.getItem('vixlano_owner_id') === d.ownerId

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteDesigner(d.id)
      nav('/')
    }
  }

  const addWork = (files) => {
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const caption = prompt("Enter a caption for this work (optional):")
        addDesignerWork(d.id, reader.result, caption)
        window.location.reload()
      }
      reader.readAsDataURL(file)
    })
  }

  const removeWork = (workId) => {
    deleteDesignerWork(d.id, workId)
    window.location.reload()
  }

  const editWork = (workId, currentCaption) => {
    const newCaption = prompt("Edit caption:", currentCaption || "")
    if (newCaption !== null) {
      updateDesignerWork(d.id, workId, newCaption)
      window.location.reload()
    }
  }

  const changeProfilePic = (file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const updated = { ...d, photo: reader.result }
      saveDesigner(updated)
      window.location.reload()
    }
    reader.readAsDataURL(file)
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Profile Info */}
      <section className="card p-6 mb-6">
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <img
              src={d.photo || 'https://via.placeholder.com/180x180?text=V'}
              alt={d.name}
              className="w-40 h-40 rounded-2xl object-cover"
            />
            {isOwner && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  id="profilePicInput"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setProfileFileName(e.target.files[0].name)
                      changeProfilePic(e.target.files[0])
                    }
                  }}
                />
                <label
                  htmlFor="profilePicInput"
                  className="btn-outline mt-2 cursor-pointer"
                >
                  Choose Profile Picture
                </label>
                {profileFileName && (
                  <p className="text-sm text-gray-600 mt-1">{profileFileName}</p>
                )}
              </>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold">{d.name}</h2>
            <p className="text-gray-600 mt-1">
              {d.category?.toUpperCase()} • {d.studio}
            </p>
            <div className="mt-3 space-y-1">
              {d.city && <p>📍 {d.address ? d.address + ', ' : ''}{d.city}</p>}
              {d.phone && <p>📞 {d.phone}</p>}
              {d.email && <p>✉️ {d.email}</p>}
            </div>
            <p className="mt-4">{d.bio}</p>

            {/* Edit/Delete Profile Buttons */}
            {isOwner && (
              <div className="mt-4 flex gap-2">
                <button
                  className="btn-outline"
                  onClick={() => nav(`/edit/${d.id}`)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn-outline text-red-500"
                  onClick={onDelete}
                >
                  Delete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section className="card p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">My Works</h3>

        {/* Upload Form (Owner Only) */}
        {isOwner && (
          <>
            <input
              type="file"
              accept="image/*"
              multiple
              id="workFilesInput"
              className="hidden"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  const names = Array.from(e.target.files).map(f => f.name)
                  setWorkFileNames(names)
                  addWork(e.target.files)
                }
              }}
            />
            <label
              htmlFor="workFilesInput"
              className="btn-outline mb-2 cursor-pointer"
            >
              Add Works
            </label>
            {workFileNames.length > 0 && (
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {workFileNames.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {d.works?.map(work => (
            <div key={work.id} className="relative card overflow-hidden">
              <img
                src={work.image}
                alt="Work"
                className="w-full h-48 object-cover"
              />
              {work.caption && (
                <p className="p-2 text-sm text-gray-700">{work.caption}</p>
              )}

              {/* Edit/Delete Buttons (Owner Only) */}
              {isOwner && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white rounded-full px-2"
                    onClick={() => editWork(work.id, work.caption)}
                  >
                    ✎
                  </button>
                  <button
                    className="bg-red-500 text-white rounded-full px-2"
                    onClick={() => removeWork(work.id)}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
          {!d.works?.length && (
            <p className="text-gray-500">No works added yet.</p>
          )}
        </div>
      </section>

      {/* Chat + Booking */}
      <div className="grid md:grid-cols-2 gap-6">
        <ChatBox designerId={d.id} />
        <BookingForm designer={d} />
      </div>
    </main>
  )
}
