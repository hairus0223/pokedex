import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonBackButton,
  IonButtons,
  IonContent,
  IonChip,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {
  getPokemonImageUrl,
  getTypeColor,
} from '../../core/utils/pokemon-utils';
import { ZeroPadPipe } from '../../shared/pipes/zero-pad.pipe';
// import { FavouritesService } from '../../core/services/favourites.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
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
export class PokemonDetailComponent implements OnInit {
  pokemon: any | null = null;
  isFavorite: boolean = false;
  defaultColor = { bgColor: 'bg-gray-300', textColor: 'text-black' };

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = {
          ...data,
          image: getPokemonImageUrl(data.id.toString()),
        };
        const primaryType = data.types[0]?.type.name;
        if (primaryType) {
          this.defaultColor = getTypeColor(primaryType);
        }
        this.checkIfFavorite(data.name);
      });
    }
  }

  async checkIfFavorite(name: string) {
    // this.isFavorite = await this.favouritesService.isFavourite(name);
  }

  async toggleFavorite() {
    if (this.pokemon) {
      // if (this.isFavorite) {
      //   await this.favouritesService.removeFavourite(this.pokemon.name);
      // } else {
      //   await this.favouritesService.addFavourite(this.pokemon);
      // }
      // this.isFavorite = !this.isFavorite;
    }
  }

  getTypeClasses(type: string): { bgColor: string; textColor: string } {
    return getTypeColor(type);
  }
}
