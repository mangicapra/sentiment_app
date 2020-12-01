import { Sentence } from "./SentimentRequest";

export interface CommentsState {
    filteredSentences: Sentence[];
    sentencesToDisplay: Sentence[];
    active: string;
}