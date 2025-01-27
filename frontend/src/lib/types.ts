export interface IEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  rating: number;
  image: string;
  on_edit: boolean;
}
