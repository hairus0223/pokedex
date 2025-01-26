import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonBackButton,
  IonButtons,
  IonContent,
  IonChip,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {
  getPokemonImageUrl,
  getTypeColor,
} from '../../core/utils/pokemon-utils';
import { ZeroPadPipe } from '../../shared/pipes/zero-pad.pipe';
import { FavouritesService } from '../../core/services/favourites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonChip,
    IonContent,
    IonButtons,
    IonBackButton,
    IonHeader,
    CommonModule,
    ZeroPadPipe,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemon: any | null = null;
  isFavorite: boolean = false;
  pokemonName: string = '';
  defaultColor = { bgColor: 'bg-gray-300', textColor: 'text-black' };
  private routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favouritesService: FavouritesService
  ) {
    addIcons({ heart, heartOutline });
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.pokemonName = params['name'];
      this.loadPokemonDetails();
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  async loadPokemonDetails() {
    this.pokemonService
      .getPokemonDetails(this.pokemonName)
      .subscribe((data) => {
        this.pokemon = {
          ...data,
          image: getPokemonImageUrl(data.id.toString()),
        };
        const primaryType = data.types[0]?.type.name;
        if (primaryType) {
          this.defaultColor = getTypeColor(primaryType);
        }
      });

    this.isFavorite = (
      await this.favouritesService.getFavoritePokemons()
    ).includes(this.pokemonName);
  }

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.favouritesService.removeFavoritePokemon(this.pokemonName);
    } else {
      await this.favouritesService.setFavoritePokemon(this.pokemonName);
    }
    this.isFavorite = !this.isFavorite;
  }

  getTypeClasses(type: string): { bgColor: string; textColor: string } {
    return getTypeColor(type);
  }
}
