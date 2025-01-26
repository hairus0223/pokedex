// src/app/core/services/favourites.service.ts
import { Injectable } from '@angular/core';
// import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private key = 'favourites';

  // Add a Pokémon to the favorites list
  async addFavourite(pokemon: any) {
    // const favourites = await this.getFavourites();
    // if (!favourites.find((fav) => fav.name === pokemon.name)) {
    //   favourites.push(pokemon);
    //   // await Preferences.set({
    //   //   key: this.key,
    //   //   value: JSON.stringify(favourites),
    //   // });
    // }
  }

  // Get the list of favorite Pokémon
  // async getFavourites(): Promise<any[]> {
  // const { value } = await Preferences.get({ key: this.key });
  // return value ? JSON.parse(value) : [];
  // }

  // Remove a Pokémon from the favorites list
  async removeFavourite(name: string) {
    // const favourites = await this.getFavourites();
    // const updated = favourites.filter((pokemon) => pokemon.name !== name);
    // await Preferences.set({
    //   key: this.key,
    //   value: JSON.stringify(updated),
    // });
  }

  // Check if a Pokémon is in the favorites list
  // async isFavourite(name: string): Promise<boolean> {
  //   const favourites = await this.getFavourites();
  //   return favourites.some((pokemon) => pokemon.name === name);
  // }
}
