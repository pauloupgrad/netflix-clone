import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total dos filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featureData &&
        <FeaturedMovie item={featureData} />
      }
      <section className="listas">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.titulo} items={item.items} />
          </div>
        ))}
      </section>

      <footer>
        Feito com <i class="fas fa-heart"></i> por PauloUpgrad<br />
        Direitos de imagens para netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando ..." />
        </div>
      }
    </div>
  );
}