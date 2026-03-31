
export enum Subject {
  BIOLOGY = 'Biologiya',
  PHYSICS = 'Fizika',
  CHEMISTRY = 'Kimyo',
  GEOGRAPHY = 'Geografiya',
  ASTRONOMY = 'Astronomiya'
}

export interface ScienceTopic {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  icon: string;
  color: string;
  grade?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
