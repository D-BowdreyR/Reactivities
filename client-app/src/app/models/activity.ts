export interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    //TODO: this smells!
    date: Date | null;
    city: string;
    venue: string;
  }