import React, { Component } from 'react';
import logo from '../static/img/logo.svg';
import '../static/css/App.css';
import Navbar from "./Navbar";
import PanelRendering from "./PanelRendering";
import PanelWriting from "./PanelWriting";
// import MenuList from './MenuList';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

/*
 Typically, in a React Redux app, you create a single Redux store
 that manages the state of your entire app. Your React components
 subscribe to only the pieces of data in the store that are relevant
 to their role.
 Then, you dispatch actions directly from React components, which then
 trigger store updates.
 */

// Action types //
const UPDATE = "UPDATE";

// Action creators //
const updateText = (text) => {
  return({
    type: UPDATE,
    text: text
  });
}

// Global reducer //
const defaultText =
`# Hello
## this is a sub-header
\`this\` is [a link](https://fib.upc.edu)

  * link 1
  * __link 2__
  * _link 3_

  > and a blockquote

![an image](https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg)
        
\`\`\`js
 let x = 1;
\`\`\``;

const defaultState = { text: defaultText };
const textReducer = (state = defaultState, action) => {
  switch(action.type) {
    case "UPDATE":
      // updates the store's state text with the dispatched action's text
      return { text: action.text };
    default:
      return state;
  }
};

// Mapping to props //
/*
  The mapDispatchToProps() function is used to provide specific
  action creators to your React components so they can
  dispatch actions against the Redux store
 */

const mapStateToProps = (state) => {
  /* Returns specific properties of the store state to the component */
  return({
    text: state.text
  });
};

const mapDispatchToProps = (dispatch) => {
  /* Provides store dispatch functions to the component to 
    be able to update the store's state with actions. */
  return({
    submitNewText: (text) => dispatch(updateText(text))
  });
};

// Container Components //

const store = createStore(textReducer);
const ContainerWriting = connect(mapStateToProps, mapDispatchToProps)(PanelWriting);
const ContainerRender = connect(mapStateToProps, null)(PanelRendering);
// const ContainerMenu = connect(mapStateToProps, null)(MenuList);
const ContainerNavbar = connect(mapStateToProps, null)(Navbar);

// React Code
/* The Provider is a wrapper component from React Redux that
  allows you to access the Redux store and dispatch functions
  throughout your component tree.
*/

class App extends Component {
  render() {
    return (
      <Provider className="App" store={store}>
          <div>
            <ContainerNavbar className="App-navbar" logo={logo}/>
            <div className="App-dashboard">
              <ContainerWriting />
              <ContainerRender />
            </div>
          </div>
      </Provider>
    );
  }
};

export default App;
