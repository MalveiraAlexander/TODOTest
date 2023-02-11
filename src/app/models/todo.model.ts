export class TodoModel {
  id: number;
  title: string;
  description: string;
  time: number;
  finished: boolean;
  timeForComplete: number;
  //internal
  paused: boolean = false;
  showPlayPuase: boolean = false;
}
