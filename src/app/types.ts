export interface Session {
    id: string;
    task: string;
    duration: number;
    goal?: string;
    goalResult?: string;
    interruptions: number;
    focusRating?: number;
    completedAt: Date;
  }