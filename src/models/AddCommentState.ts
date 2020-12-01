import { Sentence } from "./SentimentRequest";

export interface AddCommentState {
    value: string;
    sentences: Sentence[];
}
