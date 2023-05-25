export interface Task {
  _id: string,
  created_by: string,
  title: string,
  description: string,
  status: string,
  pomodoros: number,
  totalCycles: number,
  timeLeft: number,
  isComplete: boolean
}
