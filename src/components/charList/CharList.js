import {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServices from '../../services/MarvelServices';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        loadingmore: false,
        offset: 210,
        charEnded: false,
    }
    
    marvelService = new MarvelServices();

    componentDidMount() {
        this.onRequest();
        window.addEventListener('scroll', this.handleScroll);
        
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const { loadingmore } = this.state;

        // Проверяем, достиг ли пользователь нижней границы экрана
        if (loadingmore) return;

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            this.onRequest(this.state.offset);
        }
    }

    onLoadMore = () => {
        this.setState({
            loadingmore: true
        })
    }



    onRequest = (offset) => {
        this.onLoadMore();
        this.marvelService.getALLCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)

    }

    onCharListLoaded = (newcharList) => {
        this.setState(({charList, offset}) => {

            let ended = false;
            if(newcharList.length < 9) {
                ended = true;
            }

            return {
                charList: [...charList, ...newcharList],
                loading: false,
                loadingmore: false,
                offset: offset + 9,
                charEnded: ended,
            }
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCurrentChar(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid" >
                {items}
            </ul>
        )
    }

    render() {

        const {charList, loading, error, loadingmore, offset, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={loadingmore}
                    style={{"display": charEnded ? "none" : "block"}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCurrentChar: PropTypes.func.isRequired
}
export default CharList;