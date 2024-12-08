import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Sceleton from '../skeleton/Skeleton'

import './charInfo.scss';


const  CharInfo = ({charId}) => {

    const [char, setChar] = useState(null);

    // eslint-disable-next-line
    useEffect(() => updateChar(), [charId])

    const {loading, error, getCaracter} = useMarvelServices();

    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        if (!charId) {
            return;
        }
    getCaracter(charId).then(onCharLoaded)
    }

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

const View = ({char}) => {

    const setRef = (ref) => {
        if (ref) ref.focus();
    }

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
                        <a href={homepage} className="button button__main" ref={setRef}>
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
                            <li key={i} className="char__comics-item" tabIndex={0}>
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