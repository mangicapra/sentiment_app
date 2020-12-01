export interface Sentiment {
    polarity: number;
    type: string;
}

export interface Sentence {
    sentence: string;
    author: string;
    sentiment: Sentiment;
}