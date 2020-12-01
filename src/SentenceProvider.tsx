import React, { Component } from "react";
import { Sentence } from "./models/SentimentRequest";

interface SentenceContextState {
    sentences: Sentence[];
}
export interface IContextProps {
    state: SentenceContextState;
    setSentences: (value: Sentence[]) => void;
  }

export const SentenceContext = React.createContext({} as IContextProps);

export class SentenceProvider extends Component {

    state = {
        sentences: []
    };
    
    render() {
        return (
            <SentenceContext.Provider
            value={{
                state: this.state,
                setSentences: (value: Sentence[]) => this.setState({sentences: value })
                }}>
                {this.props.children}
            </SentenceContext.Provider>
        );
    }
}