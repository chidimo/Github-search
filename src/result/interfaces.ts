export enum TabTypes {
  'REPO' = 'REPO',
  'USERS' = 'USERS'
}

export interface RepoResultInterface {
  id: string | number;
  name: string;
  language: string,
  description?: string;
  stars: number;
  license: string;
  updated: Date;
}

export interface UserResultInterface {
  id: string | number;
  name: string;
  about: string;
}
