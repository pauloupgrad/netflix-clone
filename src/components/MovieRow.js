import React, { useState } from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({ title, items }) => {
    const [arrowScrollX, setArrowScrollX] = useState(0);
    const handleRightArrow = () => {
        let x = arrowScrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setArrowScrollX(x);
    }
    const handleLeftArrow = () => {
        let x = arrowScrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 80;
        }
        setArrowScrollX(x);
    }



    return (


        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow--listarea">

                <div className="movieRow--list" style={{
                    marginLeft: arrowScrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (

                        <div key={key} className="movieRow--item">
                            {item.poster_path !== null ?
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                           : <img src="./default.png" alt="Sem Imagem"/> }
                        </div>

                    ))}
                </div>

            </div>

        </div>
    );
}