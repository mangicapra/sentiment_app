import React from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
import { CommentsState } from "../models/CommentsState";
import { CommentViewProps } from "../models/CommentViewProps";
import { Sentence } from "../models/SentimentRequest";
import Comment from "./Comment";
import "./css/Comments.css";
import { isEqual } from 'lodash';

class Comments extends React.Component<CommentViewProps, CommentsState> {
    constructor(props: CommentViewProps) {
        super(props);
        const {filtered, toDisplaySentences} = this.updateComp(this.props.sentences, this.props.active);
        this.state = {
            originalSentences: this.props.sentences,
            filteredSentences: filtered,
            sentencesToDisplay: toDisplaySentences,
            active: this.props.active
        };
    }

    shouldComponentUpdate(nextProps: CommentViewProps) {
        if (nextProps.active !== this.state.active) {
            const {filtered, toDisplaySentences} = this.updateComp(this.state.originalSentences, nextProps.active);
            this.setState({
                active: nextProps.active,
                filteredSentences: filtered,
                sentencesToDisplay: toDisplaySentences
            });
        } else if (!isEqual(nextProps.sentences, this.state.originalSentences)) {
            const {filtered, toDisplaySentences} = this.updateComp(nextProps.sentences, this.state.active);
            this.setState({
                originalSentences: nextProps.sentences,
                filteredSentences: filtered,
                sentencesToDisplay: toDisplaySentences
            });
        }
        return true;
    }

    initLoad() {
        if (this.state.filteredSentences.length >= 3) {
            const toDisplay = this.state.filteredSentences.splice(0, 3);
            this.setState({sentencesToDisplay: [...this.state.sentencesToDisplay, ...toDisplay]});
        } else {
            this.setState({
                sentencesToDisplay: [...this.state.sentencesToDisplay, ...this.state.filteredSentences],
                filteredSentences: []
            })
        }
    }

    updateComp(original: Sentence[], active: string) {
        let filtered = original.filter((sentence: Sentence) => {
            if (active === 'ALL') return true;
            return sentence.sentiment.type === active
        })
        let toDisplaySentences;
        if (filtered.length >= 3) {
            toDisplaySentences = filtered.splice(0, 3);
        } else {
            toDisplaySentences = filtered;
            filtered = [];
        }
        return {filtered, toDisplaySentences};
    }

    render() {
        return (
            <div className="comments-container">
                {this.state.sentencesToDisplay.map((sentence: Sentence, index: number) => 
                    <Comment key={index} sentence={sentence}></Comment>
                )}
                {this.state.filteredSentences.length > 0 ?
                <div className="load-more">
                    <button onClick={this.initLoad.bind(this)} type="button">
                        Load more
                        <i><HiOutlineArrowDown /></i>
                    </button>
                </div>
                :
                ''}
            </div>
        );
    }
}

export default Comments
