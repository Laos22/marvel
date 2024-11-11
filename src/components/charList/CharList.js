import {Component} from 'react'

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelServices from '../../services/MarvelServices';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {

    state = {
        characters: null,
        loading: true,
        error: false
    }

    marvelServicesAll = new MarvelServices();

    componentDidMount() {
        this.updateCharList();
    // this.marvelServicesAll.getALLCharacters().then(res => console.log(res))

    }

    onCharListLoaded = (charList) => {
        let charId = 0;
        const characters = charList.map(item => {

            // console.log(item)
            return (
               <CharItem key={charId++} thumbnail={item.thumbnail} name={item.name}/>
            )
        })
        this.setState({characters, loading: false});
        // console.log(characters)
    }


    updateCharList = () => {
        console.log("updateList")
        this.marvelServicesAll
            .getALLCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    render() {

        // const {characters, loading, error} = this.state;

        // const errorMessage = error ? <ErrorMessage/> : null;
        // const spinner = loading ? <Spinner/> : null;
        // const content = !(loading || error) ? <View char={char}/>: null;


        

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.characters}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharItem = ({thumbnail, name}) => {
    let style = {objectFit: 'cover'};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        style = {objectFit: 'contain'}
    }

    return (
        <li className="char__item">
            <img src={thumbnail} alt={name} style={style}/>
            <div className="char__name">{name}</div>
        </li>
    )
    
}

export default CharList;