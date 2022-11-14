import React, {useEffect, useReducer} from 'react';
import './App.css';

import Header from './Header';
import Search from './Search';
import Movie from './Movie';

import {IMovie} from "./Movie";

type IState = {
  loading: boolean;
  movies: IMovie[];
  errorMessage: null | Error;
}

const MOVIE_API_URL: string = 'https://www.omdbapi.com/?s=man&apikey=80105910';

const initialState: IState = {
  loading: true,
  movies: [],
  errorMessage: null
};

function reducer (state: IState, action: any) {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL).then(response => response.json()).then(jsonResponse => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonResponse.Search
      })
    });
  }, []);

  function search (searchValue: string): void {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=80105910`).then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.Response === 'True') {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.Search
        })
      } else {
        dispatch({
          type: 'SEARCH_MOVIES_FAILURE',
          error: jsonResponse.Error
        })
      }
    })
  }

  const {movies, errorMessage, loading} = state;

  return (
    <div className="App">
      <Header text="HOOKED"/>
      <Search search={search}/>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
            <span>loading...</span>
        ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
        ) : (
            movies.map((movie: IMovie, index: number) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie}/>)
        )
        )}
      </div>
    </div>
  );
}

export default App;
