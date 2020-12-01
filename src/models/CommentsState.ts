import { Sentence } from "./SentimentRequest";

export interface CommentsState {
    originalSentences: Sentence[];
    filteredSentences: Sentence[];
    sentencesToDisplay: Sentence[];
    active: string;
}