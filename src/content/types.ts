export interface WeekModule {
  week: number;
  title: string;
  microlearning: {
    title: string;
    body: string;
    video?: string;
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
