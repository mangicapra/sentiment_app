import React from "react";
import { Sentence } from "../models/SentimentRequest";
import { SentenceContext } from "../SentenceProvider";
import Comments from "./Comments";
import './css/CommentView.css';
import NoComments from "./NoComments";
import PercentBar from "./PercentBar";

class CommentView extends React.Component<{}, {active: string}> {
    state: {active: string} = {
        active: 'ALL',
    };

    shouldComponentUpdate(nextState: {active: string}) {
        if (this.state.active !== nextState.active) {
            return true;
        }
        return false;
    }

    handleFilter(event: React.MouseEvent<HTMLSpanElement>) {
        const type = (event.target as HTMLSpanElement).dataset['type'] as string;
        this.setState({active: type});
    }

    render() {
        return (
            <>
                <h4>View an overwiew of general sentiment</h4>
                <SentenceContext.Consumer>
                        {(context) => (
                    context.state.sentences.length > 0 ?
                    <>
                        <PercentBar sentences={context.state.sentences}></PercentBar>
                        {Array.from(new Set(context.state.sentences.map((sentence: Sentence) => {
                                    return sentence.sentiment.type
                                }))).length > 1 && <div className="tags">
                            {context.state.sentences.length > 2 && <span onClick={this.handleFilter.bind(this)} data-type='ALL' className={this.state.active === 'ALL' ? 'active' : ''}>ALL</span>}
                            {
                                Array.from(new Set(context.state.sentences.map((sentence: Sentence) => {
                                    return sentence.sentiment.type
                                }))).map((type, index) => <span key={index} onClick={this.handleFilter.bind(this)} data-type={type} className={this.state.active === type ? 'active' : ''}>{type.toUpperCase()}</span>)
                            }
                        </div>}
                        <Comments sentences={context.state.sentences} active={this.state.active}></Comments>
                    </>
                    :
                    <NoComments></NoComments>
                        )}
                </SentenceContext.Consumer>
            </>
        );
    }
}

export default CommentView;