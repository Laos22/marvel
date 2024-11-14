import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Sceleton from '../skeleton/Skeleton'

import './charInfo.scss';


class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: null,
            loading: false,
            error: false,
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
        this.setState({error: true, loading: false})
    }

    onLoading =() => {
        this.setState({loading: true})
    }

    updateChar = () => {
        const id = this.props.charId;

        if (!id) {
            return;
        }
        this.onLoading();
        this.marvelServices
            .getCaracter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, error, loading} = this.state;

        const sceleton = char || loading || error ? null : <Sceleton/>;
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

    const {name, thumbnail, description, homepage, wiki, comics} = char;
    let style = {objectFit: 'cover'};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        style = {objectFit: 'unset'}
    }

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={style}/>
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
                {comics.length > 0 ? null: "Not comics"}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )

}

CharInfo.propTypes = {
    charId: PropTypes.number

}

export default CharInfo;