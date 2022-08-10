export interface Company {
  id: number;
  name: string;
  description: string;
  website: string;
  games: string[];
}

export interface Mode {
  id: number;
  name: string;
  description: string;
  games: string[];
}

export interface Platform {
  id: number;
  name: string;
  games: string[];
}

export interface Genre {
  id: number;
  name: string;
  description: string;
  games: string[];
}

export interface Game {
  id?: number;
  logo?: string;
  title: string;
  release: Date;
  description: string;
  rating: number;
  companyId: number;
  company?: Company;
  modes: Mode[];
  platforms: Platform[];
  genres: Genre[];
}
