import React, { ChangeEvent, Component } from "react";
import { HiOutlineArrowDown } from 'react-icons/hi';
import { AddCommentState } from "../models/AddCommentState";
import { IContextProps, SentenceContext } from "../SentenceProvider";
import './AddComment.css';
import axios, { AxiosRequestConfig } from 'axios';
import { Sentence } from "../models/SentimentRequest";

const API_BASE_URL = process.env.REACT_APP_BASE_URL || '';

class AddComment extends Component<{}, AddCommentState> {
    
    state = {
        value: '',
        sentences: []
    };

    async getSentiments(data: string) {
        const axiosConfig: AxiosRequestConfig = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await axios.post(API_BASE_URL, {text: this.state.value}, axiosConfig);
            return await Promise.resolve(response);
        } catch (error) {
            return await Promise.reject(error);
        }
    }

    handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({value: event.target.value});
    }

    transformData = (data: Sentence[]): Sentence[] => {
        return data.map((sentence: Sentence) => {
            const splited = sentence.sentence.replace(/^"(.+(?="$))"$/, '$1').split('","');
            sentence.sentence = splited[1];
            sentence.author = splited[0];
            return sentence;
        });
    }

    async handleSubmit(event: any, ctx: IContextProps) {
        event.preventDefault();
        const response = await this.getSentiments(this.state.value);
        this.setState({
            sentences: this.transformData(response.data.sentences)
        }, () => {
            console.log(this.state.sentences)
            ctx.setSentences(this.state.sentences);
        });
    }

    handleFileUpload(event: ChangeEvent<HTMLInputElement>): void {
        console.log(event.target.value)
    }

    render() {
      return (
        <SentenceContext.Consumer>
            {(context) => (
            <form onSubmit={(e) => this.handleSubmit(e, context)}>
                <div className="import-header">
                    <h4>Import comments and feedback</h4>
                    <label htmlFor="importComments">
                        <span><HiOutlineArrowDown /></span> Import comments
                        <input
                            id="importComments"
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={this.handleFileUpload}
                        />
                    </label>
                </div>
                <textarea
                    placeholder="Paste your message..."
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <div className="action">
                    {this.state.value.length > 0}
                    <button disabled={this.state.value.length === 0} type="submit">CLICK TO CHECK SENTIMENT</button>
                </div>
            </form>
            )}
        </SentenceContext.Consumer>
      );
    }
  }
  
export default AddComment;