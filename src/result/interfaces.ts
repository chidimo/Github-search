export enum TabTypes {
  REPO = 'REPO',
  USERS = 'USERS',
}

export interface AuthUserInterface {
  login: string;
  avatarUrl: string;
}

export interface PageInfoInterface {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GhResponseInterface {
  code: string;
}

export interface RepoResultInterface {
  __typename?: string;
  id: string;
  url: string;
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
  url: string;
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

export interface SearchReturnInterface {
  error: any;
  loading: boolean;
  data: {
    search: {
      repositoryCount: number;
      pageInfo: PageInfoInterface;
      edges: { node: RepoResultInterface }[];
    };
  };
}
