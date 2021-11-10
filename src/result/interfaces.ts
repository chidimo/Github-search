
export enum TabTypes {
  REPO = 'REPO',
  USERS = 'USERS',
}

export interface GhResponseInterface {
  code: string
}

export interface RepoResultInterface {
  id: string | number;
  name: string;
  language: string;
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

export interface DataArrayInterface {
  name: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}
