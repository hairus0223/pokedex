import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { PokemonCardComponent } from '../../shared/components/pokemon-card/pokemon-card.component';
import {
  IonGrid,
  IonContent,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonToolbar,
  IonFooter,
  IonSegmentButton,
  IonSegment,
  IonLabel,
  IonFab,
  IonIcon,
  IonFabButton,
} from '@ionic/angular/standalone';
import { Pokemon } from '../../core/models/pokemon.model';
import { PokemonFilterComponent } from '../pokemon-filter/pokemon-filter.component';
import { FavouritesService } from '../../core/services/favourites.service';
import { getPokemonImageUrl } from '../../core/utils/pokemon-utils';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowUpOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    IonFabButton,
    IonIcon,
    IonFab,
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
  @ViewChild(IonContent) content!: IonContent;
  pokemons: any[] = [];
  filteredPokemons: Pokemon[] = [];
  favorites: any = [];
  pokemonTypes: string[] = [];
  searchQuery = '';
  selectedType = '';
  offset = 0;
  limit = 20;
  selectedSegment = 'default';
  isFabVisible: boolean = false;

  constructor(
    private router: Router,
    private pokemonService: PokemonService,
    private favouritesService: FavouritesService
  ) {
    addIcons({ arrowUpOutline });
  }

  ngOnInit() {
    this.loadPokemon();
    this.loadFavorites();
    // this.loadPokemonTypes();
    this.router.events.subscribe(() => {
      this.loadFavorites();
      this.applyFilters();
    });
  }

  // For scroll events
  onContentScroll(event: any): void {
    const scrollPosition = event.detail.scrollTop || 0;
    this.isFabVisible = scrollPosition > 200; // Show FAB only after scrolling down 200px
  }

  // Scroll to the top of the page
  scrollToTop() {
    if (this.content) {
      this.content.scrollToTop(1000); // Smooth scroll to top over 1000ms
    }
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

  async loadFavorites() {
    this.favorites = await this.favouritesService.getFavoritePokemons();

    if (this.selectedSegment === 'favorites') {
      const favoritePokemons = this.pokemons.filter((pokemon) =>
        this.favorites.includes(pokemon.name)
      );
      const favoriteTypes = favoritePokemons.flatMap(
        (pokemon) => pokemon.types
      );
      this.pokemonTypes = Array.from(new Set(favoriteTypes));
    } else {
      const allTypes = this.pokemons.flatMap((pokemon) => pokemon.types);
      this.pokemonTypes = Array.from(new Set(allTypes));
    }

    this.applyFilters();
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.loadPokemon();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
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
      const isFavorite =
        this.selectedSegment === 'favorites'
          ? this.favorites.includes(pokemon.name)
          : true;
      return matchesSearch && matchesType && isFavorite;
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

  async toggleFavorite(pokemon: any) {
    if (this.favorites.includes(pokemon.name)) {
      await this.favouritesService.removeFavoritePokemon(pokemon.name);
    } else {
      await this.favouritesService.setFavoritePokemon(pokemon.name);
    }
    this.loadFavorites();
    this.applyFilters();
  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
    this.loadFavorites();
    this.applyFilters();
  }
}
