import { Component } from 'react';
import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Sceleton from '../skeleton/Skeleton'

import './charInfo.scss';


class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: {
                name: null,
                description: null,
                thumbnail: null,
                homepage: null,
                wiki: null,
            },
            loading: false,
            error: false,
            currentChar: this.props.charId
        }
    }

    

    componentDidMount() {
        // this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentWillUnmount() {
    }


    marvelServices = new MarvelServices();

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    onError = () => {
        // console.log("error")
        this.setState({error: true, loading: false})
    }

    onLoading =() => {
        // console.log("spinner")
        this.setState({loading: true, error: false})
    }

    updateChar = () => {
        const id = this.props.charId;
        this.onLoading();
        this.marvelServices
            .getCaracter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }


    render() {
        const {char, error, loading} = this.state;

        const sceleton = this.props.charId ? null : <Sceleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || sceleton) ? <View char={char}/>: null;

        return (
            <div className="char__info">
                {sceleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }

}

const View = ({char}) => {
    const {name, thumbnail, description, homepage, wiki} = char;


    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <li className="char__comics-item">
                    All-Winners Squad: Band of Heroes (2011) #3
                </li>
            </ul>
        </>
    )

}

export default CharInfo;