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
  name: string;
  about: string;
}
