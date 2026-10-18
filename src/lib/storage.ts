// LocalStorage helpers for Visitor Hit Counter & Dream Guestbook

export interface DreamWish {
  id: string;
  name: string;
  message: string;
  sticker: string;
  timestamp: string;
}

const DEFAULT_WISHES: DreamWish[] = [
  {
    id: 'seed-1',
    name: 'Pip the Skull Baby',
    message: 'Lumi, thank you for sending that soft cloud dream to the Midnight Nursery! ⭐',
    sticker: '⭐',
    timestamp: 'Just now',
  },
  {
    id: 'seed-2',
    name: 'Barnaby the Little Owl',
    message: 'The lantern you spun helped me read my bedtime book in the hollow tree.',
    sticker: '🌙',
    timestamp: '1 hour ago',
  },
  {
    id: 'seed-3',
    name: 'Milo the Cloud Bunny',
    message: 'Can you weave extra marshmallow stars tonight? ☁️',
    sticker: '☁️',
    timestamp: '3 hours ago',
  },
];

export function getHitCount(): number {
  if (typeof window === 'undefined') return 1842;
  const raw = localStorage.getItem('lumi_hit_counter');
  if (!raw) {
    const initial = 1842;
    localStorage.setItem('lumi_hit_counter', String(initial + 1));
    return initial + 1;
  }
  const count = parseInt(raw, 10) + 1;
  localStorage.setItem('lumi_hit_counter', String(count));
  return count;
}

export function getGuestbookWishes(): DreamWish[] {
  if (typeof window === 'undefined') return DEFAULT_WISHES;
  const raw = localStorage.getItem('lumi_guestbook_wishes');
  if (!raw) {
    localStorage.setItem('lumi_guestbook_wishes', JSON.stringify(DEFAULT_WISHES));
    return DEFAULT_WISHES;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_WISHES;
  }
}

export function saveGuestbookWish(name: string, message: string, sticker: string): DreamWish {
  const wishes = getGuestbookWishes();
  const newWish: DreamWish = {
    id: 'wish-' + Date.now(),
    name: name.trim() || 'A Sleepy Stargazer',
    message: message.trim(),
    sticker: sticker || '⭐',
    timestamp: 'Moments ago',
  };
  const updated = [newWish, ...wishes];
  if (typeof window !== 'undefined') {
    localStorage.setItem('lumi_guestbook_wishes', JSON.stringify(updated));
  }
  return newWish;
}
