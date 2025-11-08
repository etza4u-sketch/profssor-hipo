export interface AnswerOption {
  value: number;
  text: string;
}

export interface Question {
  id: number;
  text: string;
}

export interface Category {
  id: number;
  title: string;
  explanation: string;
  questions: Question[];
}

export type Answers = {
  [key: number]: number; // key is questionId, value is the score (0-4)
};

export interface PatientDetails {
  name: string;
  phone: string;
  email: string;
}

export interface ScoreDetails {
  percentage: number;
  severity: 'normal' | 'medium' | 'severe' | 'critical';
  colorClasses: { 
    bg: string; 
    border: string; 
    text: string; 
    ring: string; 
  };
  label: string;
}

export type AppState = 'welcome' | 'patientDetails' | 'questionnaire' | 'summary' | 'resources';