/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Reducer } from 'react';

export enum SearchActionType {
  SET_SEARCH_FILTER = 'SET_SEARCH_FILTER',
}

export interface SearchRepoType {
  first?: number;
  after?: string | null;
  searchTerm?: string | null;
}

export interface SearchReducerType {
  type: SearchActionType;
  payload?: Partial<SearchRepoType>;
}

export const initSearchState: SearchRepoType = {
  first: 10,
  after: null,
  searchTerm: null,
};

export const searchReducer: Reducer<SearchRepoType, SearchReducerType> = (
  state = initSearchState,
  action: any
) => {
  switch (action.type) {
    case SearchActionType.SET_SEARCH_FILTER:
      return {
        ...state,
        first: action.payload.first || 10,
        searchTerm: action.payload.searchTerm || '',
        after: action.payload.after
          ? action.payload.after[action.payload.after.length-1]
          : null,
      };
    default:
      return state;
  }
};


export enum SearchUserActionType {
  SET_USER_SEARCH = 'SET_USER_SEARCH',
}

export interface SearchUserStateType {
  first?: number;
  after?: string | null;
  searchTerm?: string | null;
}

export interface SearchUserReducerType {
  type: SearchUserActionType;
  payload?: Partial<SearchUserStateType>;
}

export const initSearchUserState: SearchUserStateType = {
  first: 10,
  after: null,
  searchTerm: null,
};

export const searchUserReducer: Reducer<SearchUserStateType, SearchUserReducerType> = (
  state = initSearchState,
  action: any
) => {
  switch (action.type) {
    case SearchUserActionType.SET_USER_SEARCH:
      return {
        ...state,
        first: action.payload.first || 10,
        searchTerm: action.payload.searchTerm || '',
        after: action.payload.after
          ? action.payload.after[action.payload.after.length-1]
          : null,
      };
    default:
      return state;
  }
};
