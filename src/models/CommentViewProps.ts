import { Sentence } from "./SentimentRequest";

export interface CommentViewProps {
    sentences: Sentence[],
    active: string;
}
