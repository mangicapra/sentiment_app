import './App.css';
import Header from './Header/Header';
import React from 'react';
import AddComment from './AddComment/AddComment';
import CommentView from './CommentView/CommentView';
import { Component } from 'react';
import { SentenceProvider } from './SentenceProvider';

class App extends Component {
  render() {
    return (
      <>
        <Header></Header>
        <div className="layout">
          <SentenceProvider>
            <div className="layout-left">
              <AddComment></AddComment>
            </div>
            <div className="layout-right">
              <CommentView></CommentView>
            </div>
          </SentenceProvider>
        </div>
      </>
  );
  }
}

export default App;
