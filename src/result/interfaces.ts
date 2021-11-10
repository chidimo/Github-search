export enum TabTypes {
  REPO = 'REPO',
  USERS = 'USERS',
}

export interface GhResponseInterface {
  code: string;
}

export interface RepoResultInterface {
  __typename?: string;
  id: string;
  nameWithOwner: string;
  updatedAt: string;
  description: string;
  stargazerCount: number;
  licenseInfo?: {
    __typename?: string;
    name: string;
  };
  primaryLanguage?: {
    __typename?: string;
    name: string;
  };
}

export interface UserResultInterface {
  id: string;
  bio: string;
  name: string;
  __typename?: string;
}

export interface DataArrayInterface {
  name: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}
