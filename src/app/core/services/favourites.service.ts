import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favoriteKey = 'favoritePokemons';

  // Get favorite Pokémon from Capacitor Preferences
  async getFavoritePokemons(): Promise<string[]> {
    const { value } = await Preferences.get({ key: this.favoriteKey });
    return value ? JSON.parse(value) : [];
  }

  // Set a favorite Pokémon in Capacitor Preferences
  async setFavoritePokemon(pokemonName: string): Promise<void> {
    const favorites = await this.getFavoritePokemons();
    if (!favorites.includes(pokemonName)) {
      favorites.push(pokemonName);
      await Preferences.set({
        key: this.favoriteKey,
        value: JSON.stringify(favorites),
      });
    }
  }

  // Remove a Pokémon from the favorites
  async removeFavoritePokemon(pokemonName: string): Promise<void> {
    const favorites = await this.getFavoritePokemons();
    const updatedFavorites = favorites.filter((name) => name !== pokemonName);
    await Preferences.set({
      key: this.favoriteKey,
      value: JSON.stringify(updatedFavorites),
    });
  }
}
