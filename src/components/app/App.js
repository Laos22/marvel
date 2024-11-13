import { Component } from 'react';


import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        currentChar: null
    }

    onCurrentChar = (id) => {
        this.setState({currentChar: id})
    }

    
    render() {

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
      