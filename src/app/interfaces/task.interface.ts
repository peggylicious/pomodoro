export interface Task {
  _id: string,
  created_by: string,
  title: string,
  description: string,
  date: Date,
  status: string,
  pomodoros: number,
  totalCycles: number,
  timeLeft: number,
  isCompleteCycle: boolean,
  singleCycle: number,
  category: string,
  selectedPomodoros: number,
  isCompletePomodoros: boolean
}
