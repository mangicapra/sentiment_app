import React, { Component } from "react";
import { MdSentimentDissatisfied, MdSentimentNeutral, MdSentimentSatisfied } from "react-icons/md"
import { Sentence } from "../models/SentimentRequest";
import './css/PercentBar.css';
import { isEqual } from 'lodash';

class PercentBar extends Component<{sentences: Sentence[]}, {hover: boolean, sentences: Sentence[]}> {
    positive: number;
    negative: number;
    neutral: number;
    positivePercent: number;
    negativePercent: number;
    neutralPercent: number;
    x: number;
    y: number;
    parent: React.RefObject<HTMLDivElement>;
    tooltip: React.RefObject<HTMLDivElement>;

    constructor(props: {sentences: Sentence[]}) {
        super(props);
        
        this.state = {
            sentences: this.props.sentences,
            hover: false
        };

        this.positive = 0;
        this.negative = 0;
        this.neutral = 0;
        this.positivePercent = 0;
        this.negativePercent = 0;
        this.neutralPercent = 0;
        this.x = 0;
        this.y = 0;
        this.parent = React.createRef();
        this.tooltip = React.createRef();

        this.calculateBars();
    }

    shouldComponentUpdate(nextProps: {sentences: Sentence[]}, nextState: {hover: boolean, sentences: Sentence[]}) {
        if (!isEqual(this.state.sentences, nextProps.sentences)) {
            this.setState({sentences: nextProps.sentences}, () => this.calculateBars());
        }
        return true;
    }

    calculateBars() {
        const {sentences} = this.state
        const total = sentences.length;
        this.positive = 0;
        this.negative = 0;
        this.neutral = 0;
        this.positivePercent = 0;
        this.negativePercent = 0;
        this.neutralPercent = 0;
        for (const sentence of sentences) {
            switch (sentence.sentiment.type) {
                case 'negative':
                    this.negative++;
                    break;
            
                case 'neutral':
                    this.neutral++;
                    break;
    
                default:
                    this.positive++;
                    break;
            }
        }
        
        this.positivePercent = this.positive / total * 100;
        this.negativePercent = this.negative / total * 100;
        this.neutralPercent = this.neutral / total * 100;
    }

    handleMouseOver(event: any) {
        this.setState({hover: true});
        const bounds = this.parent.current?.getBoundingClientRect() as DOMRect;
        this.x = event.clientX - bounds.left - (this.tooltip.current?.getBoundingClientRect() as DOMRect).width;
        this.y = event.clientY - bounds.top + 5;
    }

    handleMouseOut() {
        this.setState({hover: false});
    }
    
    render() {
        return (
            <div ref={this.parent} className="percentWrapper">
                <div onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)} className="percentBar">
                    <span style={{width: `${this.positivePercent}%`}} className="positive"></span>
                    <span style={{width: `${this.neutralPercent}%`}} className="neutral"></span>
                    <span style={{width: `${this.negativePercent}%`}} className="negative"></span>
                </div>
                <div ref={this.tooltip} style={{visibility: this.state.hover ? 'visible' : 'hidden', top: this.y, left: this.x}} className="tooltip">
                    {this.positive !== 0 && <p className="positive"> <i><MdSentimentSatisfied/></i> <span>{Math.round(this.positivePercent)}%</span> ({this.positive}) </p>}
                    {this.neutral !== 0 && <p className="neutral"><i><MdSentimentNeutral/></i> <span>{Math.round(this.neutralPercent)}%</span> ({this.neutral})</p>}
                    {this.negative !== 0 && <p className="negative"><i><MdSentimentDissatisfied/></i> <span>{Math.round(this.negativePercent)}%</span> ({this.negative}) </p>}
                </div>
            </div>
          );
    }
};

export default PercentBar;
