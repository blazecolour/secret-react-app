import {OMDB_KEY, OMDB_BASE_URL, OMDB_PLOT, NYTIMES_KEY, NYTIMES_BASE_URL} from '../constants/api';

export const getOmdbApi = name => `${OMDB_BASE_URL}${name}${OMDB_PLOT}${OMDB_KEY}`;

export const getNytimesApi = offset => `${NYTIMES_BASE_URL}${NYTIMES_KEY}&offset=${offset}`;
