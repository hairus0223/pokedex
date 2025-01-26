import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import {
  PokemonDetails,
  PokemonListResponse,
  PokemonTypeResponse,
  PokemonWithTypes,
} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(
    offset: number = 0,
    limit: number = 20
  ): Observable<PokemonWithTypes[]> {
    return this.http
      .get<PokemonListResponse>(
        `${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`
      )
      .pipe(
        mergeMap((response) => {
          const pokemonRequests = response.results.map((pokemon) =>
            this.getPokemonDetails(pokemon.name)
          );
          return forkJoin(pokemonRequests);
        }),
        map((pokemonDetailsArray) =>
          pokemonDetailsArray.map((details) => {
            return {
              id: details.id,
              name: details.name,
              url: `${this.baseUrl}/pokemon/${details.id}/`,
              types: details.types.map((type) => type.type.name),
            };
          })
        )
      );
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${name}`);
  }

  getPokemonTypes(): Observable<PokemonTypeResponse> {
    return this.http.get<PokemonTypeResponse>(`${this.baseUrl}/type`);
  }
}
