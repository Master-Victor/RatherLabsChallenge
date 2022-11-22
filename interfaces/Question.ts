import { QuestionOptions } from './QuestionOptions' 
export interface Question {
    text ?: String,
    image ?: String,
    lifetimeSeconds?: Number,
    options: QuestionOptions[]
}