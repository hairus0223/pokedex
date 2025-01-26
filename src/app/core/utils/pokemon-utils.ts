export function getTypeColor(type: string): {
  bgColor: string;
  textColor: string;
} {
  const typeColors: Record<string, { bgColor: string; textColor: string }> = {
    grass: { bgColor: 'bg-green-100', textColor: 'text-black' },
    fire: { bgColor: 'bg-red-100', textColor: 'text-black' },
    water: { bgColor: 'bg-blue-100', textColor: 'text-black' },
    bug: { bgColor: 'bg-lime-100', textColor: 'text-black' },
    normal: { bgColor: 'bg-gray-100', textColor: 'text-black' },
    electric: { bgColor: 'bg-yellow-100', textColor: 'text-black' },
    ice: { bgColor: 'bg-cyan-100', textColor: 'text-black' },
    fighting: { bgColor: 'bg-red-100', textColor: 'text-black' },
    poison: { bgColor: 'bg-purple-100', textColor: 'text-black' },
    ground: { bgColor: 'bg-yellow-100', textColor: 'text-black' },
    flying: { bgColor: 'bg-indigo-100', textColor: 'text-black' },
    psychic: { bgColor: 'bg-pink-100', textColor: 'text-black' },
    rock: { bgColor: 'bg-stone-100', textColor: 'text-black' },
    ghost: { bgColor: 'bg-violet-100', textColor: 'text-black' },
    dragon: { bgColor: 'bg-indigo-100', textColor: 'text-black' },
    dark: { bgColor: 'bg-gray-100', textColor: 'text-black' },
    steel: { bgColor: 'bg-gray-100', textColor: 'text-black' },
    fairy: { bgColor: 'bg-pink-100', textColor: 'text-black' },
  };

  return (
    typeColors[type] || { bgColor: 'bg-gray-100', textColor: 'text-black' }
  ); // Default color
}

export function getPokemonImageUrl(pokemonName: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonName}.png`;
}
