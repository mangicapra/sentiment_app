import React, { ChangeEvent, Component } from "react";
import { HiOutlineArrowDown } from 'react-icons/hi';
import { AddCommentState } from "../models/AddCommentState";
import { IContextProps, SentenceContext } from "../SentenceProvider";
import './AddComment.css';
import axios, { AxiosRequestConfig } from 'axios';
import { Sentence } from "../models/SentimentRequest";
import CSVReader from "react-csv-reader";

const API_BASE_URL = process.env.REACT_APP_BASE_URL || '';

class AddComment extends Component<{}, AddCommentState> {
    
    state = {
        value: '',
        sentences: []
    };

    papaparseOptions = {
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_")
      };

    componentDidMount() {
        const sentiments = JSON.parse(localStorage.getItem('sentiments') as string) as AddCommentState;
        if (sentiments) {
            this.setState({
                value: sentiments.value,
                sentences: this.transformData(sentiments.sentences)
            }, () => this.context.setSentences(this.state.sentences))
        }
    }

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
        console.log(this.state.value)
        const response = await this.getSentiments(this.state.value);
        localStorage.setItem('sentiments', JSON.stringify({
            value: this.state.value,
            sentences: response.data.sentences
        }));
        this.setState({
            sentences: this.transformData(response.data.sentences)
        }, () => {
            ctx.setSentences(this.state.sentences);
        });
    }

    handleImport(data: any) {
        const importedSentences = data.map((el: string[]) => `"${el[0]}","${el[1]}"\n`);
        this.setState({value: this.state.value.concat(...importedSentences)});
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
                            <CSVReader
                                onFileLoaded={this.handleImport.bind(this)}
                                parserOptions={this.papaparseOptions}
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

AddComment.contextType = SentenceContext;  

export default AddComment;
