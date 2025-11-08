export type Difficulty = 'easy' | 'medium' | 'hard'

export type Question = {
  type: 'multiple' | 'boolean'
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type ApiResponse = {
  response_code: number
  results: Question[]
}
