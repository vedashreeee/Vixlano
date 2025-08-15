const KEYS = {
  designers: 'vixlano_designers',
  bookings: 'vixlano_bookings',
  chats: 'vixlano_chats',
};

export function getDesigners() {
  return JSON.parse(localStorage.getItem(KEYS.designers) || '[]');
}

export function saveDesigner(d) {
  const list = getDesigners();

  // If creating a new profile
  if (!d.id) {
    d.id = crypto.randomUUID();

    // Step 3: Assign an ownerId (one per browser)
    let ownerId = localStorage.getItem('vixlano_owner_id');
    if (!ownerId) {
      ownerId = crypto.randomUUID();
      localStorage.setItem('vixlano_owner_id', ownerId);
    }
    d.ownerId = ownerId;
  }

  const idx = list.findIndex(x => x.id === d.id);
  if (idx >= 0) {
    list[idx] = d;
  } else {
    list.push(d);
  }

  localStorage.setItem(KEYS.designers, JSON.stringify(list));
  return d;
}


export function getDesignersByCategory(cat) {
  return getDesigners().filter(d => d.category === cat);
}

export function getDesigner(id) {
  return getDesigners().find(d => d.id === id);
}

export function getBookings() {
  return JSON.parse(localStorage.getItem(KEYS.bookings) || '[]');
}

export function addBooking(b) {
  const list = getBookings();
  b.id = crypto.randomUUID();
  list.push(b);
  localStorage.setItem(KEYS.bookings, JSON.stringify(list));
  return b;
}

export function getChat(designerId) {
  const chats = JSON.parse(localStorage.getItem(KEYS.chats) || '{}');
  return chats[designerId] || [];
}

export function sendMessage(designerId, message) {
  const chats = JSON.parse(localStorage.getItem(KEYS.chats) || '{}');
  if (!chats[designerId]) chats[designerId] = [];
  chats[designerId].push({ ...message, ts: new Date().toISOString() });
  localStorage.setItem(KEYS.chats, JSON.stringify(chats));
  return chats[designerId];
}

/* ---------------- NEW FUNCTIONS ---------------- */
export function deleteDesigner(id) {
  const list = getDesigners().filter(d => d.id !== id);
  localStorage.setItem(KEYS.designers, JSON.stringify(list));
}

export function updateDesigner(updated) {
  const list = getDesigners().map(d => d.id === updated.id ? updated : d);
  localStorage.setItem(KEYS.designers, JSON.stringify(list));
}
export function addDesignerWork(designerId, imageBase64, caption = "") {
  const designers = getDesigners()
  const idx = designers.findIndex(d => d.id === designerId)
  if (idx >= 0) {
    if (!designers[idx].works) designers[idx].works = []
    designers[idx].works.push({
      id: crypto.randomUUID(),
      image: imageBase64,  // store base64 string
      caption
    })
    localStorage.setItem(KEYS.designers, JSON.stringify(designers))
  }
}


export function deleteDesignerWork(designerId, workId) {
  const designers = getDesigners();
  const idx = designers.findIndex(d => d.id === designerId);
  if (idx >= 0 && designers[idx].works) {
    designers[idx].works = designers[idx].works.filter(w => w.id !== workId);
    localStorage.setItem(KEYS.designers, JSON.stringify(designers));
  }
}
export function updateDesignerWork(designerId, workId, newCaption) {
  const designers = getDesigners();
  const idx = designers.findIndex(d => d.id === designerId);
  if (idx >= 0 && designers[idx].works) {
    designers[idx].works = designers[idx].works.map(w =>
      w.id === workId ? { ...w, caption: newCaption } : w
    );
    localStorage.setItem(KEYS.designers, JSON.stringify(designers));
  }
}
