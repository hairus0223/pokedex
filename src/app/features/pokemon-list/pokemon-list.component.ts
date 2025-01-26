import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonCardComponent } from '../../shared/components/pokemon-card/pokemon-card.component';
import {
  IonGrid,
  IonContent,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonHeader,
  InfiniteScrollCustomEvent,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonFooter,
  IonSegmentButton,
  IonSegment,
  IonLabel,
} from '@ionic/angular/standalone';
import { Pokemon, PokemonType } from '../../core/models/pokemon.model';
import { PokemonFilterComponent } from '../pokemon-filter/pokemon-filter.component';
import { FavouritesService } from '../../core/services/favourites.service';
import { getPokemonImageUrl } from '../../core/utils/pokemon-utils';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonFooter,
    IonToolbar,
    IonInfiniteScroll,
    IonRow,
    IonContent,
    IonGrid,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
    PokemonCardComponent,
    PokemonFilterComponent,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: Pokemon[] = [];
  pokemonTypes: string[] = [];
  searchQuery = '';
  selectedType = '';
  offset = 0;
  limit = 20;

  private favouritesService = inject(FavouritesService);

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemon();
    // this.loadPokemonTypes();
  }

  // Load the list of Pokémon with pagination
  loadPokemon() {
    this.pokemonService
      .getPokemonList(this.offset, this.limit)
      .subscribe((response) => {
        const newPokemons = response.map((pokemon: any) => ({
          ...pokemon,
          name: pokemon.name,
          image: getPokemonImageUrl(pokemon.id.toString()),
          types: pokemon.types,
        }));

        // Add new Pokémon to the list
        this.pokemons.push(...newPokemons);

        // Extract types from the Pokémon list
        const allTypes = newPokemons.flatMap((pokemon) => pokemon.types);
        this.pokemonTypes = Array.from(
          new Set([...this.pokemonTypes, ...allTypes])
        );

        this.applyFilters();
        this.offset += this.limit;
      });
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.loadPokemon();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  // Load the Pokémon types for the filter dropdown
  // loadPokemonTypes() {
  //   this.pokemonService.getPokemonTypes().subscribe((types) => {
  //     this.pokemonTypes = types.results.map((type: PokemonType) => type.name);
  //   });
  // }

  // Apply search and type filters
  applyFilters() {
    this.filteredPokemons = this.pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesType =
        !this.selectedType || pokemon.types?.includes(this.selectedType);
      return matchesSearch && matchesType;
    });
  }

  // Handle search input change
  onSearch(query: string) {
    this.searchQuery = query;
    this.applyFilters();
  }

  // Handle type filter change
  onFilterType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  // Handle favoriting/unfavoriting a Pokémon
  // async toggleFavorite(pokemon: Pokemon) {
  //   const isFavorite = await this.favouritesService.isFavourite(pokemon.name);
  //   if (isFavorite) {
  //     await this.favouritesService.removeFavourite(pokemon.name);
  //   } else {
  //     await this.favouritesService.addFavourite(pokemon);
  //   }
  // }

  // // Check if a Pokémon is favorited
  // async isFavorite(pokemon: Pokemon): Promise<boolean> {
  //   return await this.favouritesService.isFavourite(pokemon.name);
  // }
}
