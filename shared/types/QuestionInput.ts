export type QuestionInput = {
  id?: string
  text:  string
  correctAnswer?:  string
  verified?: boolean
  answers?: string[]
  subjectId: string
  explanation?: string
}