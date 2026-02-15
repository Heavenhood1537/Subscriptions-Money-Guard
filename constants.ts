
import { Frequency, ActionStatus, Subscription } from './types';

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  { id: '1', name: '🛜 Internet', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '2', name: '☎ Home phone / landline', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '3', name: '📱 Mobile phone plan', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '4', name: '📺 Cable / satellite TV', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '5', name: '🎬 Streaming services (Netflix, etc.)', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '6', name: '🎵 Music / audio (Spotify, etc.)', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '7', name: '☁ Cloud storage / backups', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '8', name: '💻 Software (Antivirus, Office, etc.)', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '9', name: '📰 Newspapers / Magazines', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '10', name: '🎮 Games & in‑app subscriptions', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '11', name: '🧾 Other memberships (Gym, Clubs)', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '12', name: '🏠 Home insurance', provider: '', amount: 0, frequency: Frequency.YEARLY, status: ActionStatus.KEEP },
  { id: '13', name: '❤️ Life / health insurance', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '14', name: '🚗 Car insurance', provider: '', amount: 0, frequency: Frequency.YEARLY, status: ActionStatus.KEEP },
  { id: '15', name: '🚗 Car lease / financing', provider: '', amount: 0, frequency: Frequency.MONTHLY, status: ActionStatus.KEEP },
  { id: '16', name: '🍱 Food delivery / meal boxes', provider: '', amount: 0, frequency: Frequency.WEEKLY, status: ActionStatus.KEEP },
];
