
import { useEffect, useRef, useState } from 'react'
import { getChat, sendMessage } from '../store/localStore'

export default function ChatBox({ designerId }){
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const endRef = useRef()

  useEffect(()=>{
    setMessages(getChat(designerId))
  }, [designerId])

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:'smooth'})
  }, [messages])

  const onSend = () => {
    if(!text.trim()) return
    const user = { from: 'user', text: text.trim() }
    const thread = sendMessage(designerId, user)
    setMessages(thread)
    setText('')
  }

  return (
    <div className="card p-4 h-80 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {messages.map((m, i)=>(
          <div key={i} className={`max-w-[75%] px-3 py-2 rounded-xl ${m.from==='user' ? 'bg-pastel-mint self-end' : 'bg-white border'}`}>
            <p className="text-sm">{m.text}</p>
            <div className="text-[10px] text-gray-500 mt-1">{new Date(m.ts).toLocaleString()}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="mt-3 flex gap-2">
        <input className="input" value={text} placeholder="Write a message..." onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter' && onSend()} />
        <button className="btn-primary" onClick={onSend}>Send</button>
      </div>
    </div>
  )
}
