export interface ChecklistItem {
  id: string;
  label: string;
}

export interface QuizOption {
  id: string;
  label: string;
  correct?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface WeekModule {
  week: number;
  title: string;
  microlearning: {
    title: string;
    body: string;
  };
  checklist?: {
    title: string;
    items: ChecklistItem[];
  };
  quiz?: {
    title: string;
    questions: QuizQuestion[];
  };
  reflection: {
    question: string;
  };
  challenge: {
    emoji: string;
    title: string;
    description: string;
  };
}
