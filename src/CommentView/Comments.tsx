import React from "react";
import { HiOutlineArrowDown } from "react-icons/hi";
import { CommentsState } from "../models/CommentsState";
import { CommentViewProps } from "../models/CommentViewProps";
import { Sentence } from "../models/SentimentRequest";
import Comment from "./Comment";
import "./css/Comments.css";

class Comments extends React.Component<CommentViewProps, CommentsState> {
    constructor(props: CommentViewProps) {
        super(props);

        this.state = {
            filteredSentences: [],
            sentencesToDisplay: [],
            active: this.props.active
        };
    }

    componentDidMount() {
        this.handleFilter();
    }

    shouldComponentUpdate(nextProps: CommentViewProps) {
        if (nextProps.active !== this.state.active) {
            this.setState({active: nextProps.active}, () => {
                this.handleFilter()
            });

        }
        return true;
    }

    initLoad() {
        if (this.state.filteredSentences.length >= 3) {
            const toDisplay = this.state.filteredSentences.splice(0, 3);
            this.setState({sentencesToDisplay: [...this.state.sentencesToDisplay, ...toDisplay]});
        } else {
            this.setState({sentencesToDisplay: this.state.filteredSentences}, () => this.setState({filteredSentences: []}))
        }
    }

    handleFilter() {
        this.setState({
            filteredSentences: this.props.sentences.filter((sentence: Sentence) => {
                if (this.state.active === 'ALL') return true;
                return sentence.sentiment.type === this.state.active
            })
        }, () => this.initLoad())
    }

    render() {
        return (
            <div className="comments-container">
                {this.state.sentencesToDisplay.map((sentence: Sentence, index: number) => 
                    <Comment key={index} sentence={sentence}></Comment>
                )}
                {this.state.filteredSentences.length > 0 ?
                <div className="load-more">
                    <button onClick={this.initLoad} type="button">
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