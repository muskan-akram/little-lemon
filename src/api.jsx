const STORAGE_KEY = 'little-lemon-times-v1';

function generateDefaultTimes() {
  return [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ];
}

export function fetchAPI(date) {
  return new Promise((resolve) => {
    const storedRaw = localStorage.getItem(STORAGE_KEY);
    const stored = storedRaw ? JSON.parse(storedRaw) : null;
    if (!stored) {
      const map = {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
      resolve(generateDefaultTimes());
    } else {
      if (stored[date]) resolve(stored[date]);
      else resolve(generateDefaultTimes());
    }
  });
}

export function submitAPI(formData) {
  return new Promise((resolve) => {
    const date = formData.date;
    const time = formData.time;
    const storedRaw = localStorage.getItem(STORAGE_KEY);
    const stored = storedRaw ? JSON.parse(storedRaw) : {};
    const current = stored[date] || generateDefaultTimes();
    const updated = current.filter(t => t !== time);
    stored[date] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    setTimeout(() => resolve({ success: true, booking: formData }), 400);
  });
}