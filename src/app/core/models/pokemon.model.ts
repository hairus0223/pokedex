export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url?: string;
  image?: string;
  types?: string[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
}

export interface PokemonTypeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonType[];
}
export interface PokemonWithTypes {
  name: string;
  url: string;
  types: string[];
}

export interface PokemonType {
  name: string;
  url: string;
  type?: any;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
  [key: string]: string | undefined;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
