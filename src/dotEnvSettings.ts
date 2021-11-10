const pr = process.env;

export const IS_TEST: boolean = pr.NODE_ENV === 'test';
export const IS_PROD: boolean = pr.NODE_ENV === 'production';

export const GITHUB_CLIENT_ID = pr.REACT_APP_GITHUB_CLIENT_ID;
