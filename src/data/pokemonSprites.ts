// Pokemon sprite data - uses PokeAPI CDN
export interface PokemonSpriteData {
  id: number;
  name: string;
  spriteUrl: string;
  animatedUrl?: string;
}

export const POKEMON_SPRITES: PokemonSpriteData[] = [
  {
    id: 25,
    name: 'Pikachu',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif',
  },
  {
    id: 6,
    name: 'Charizard',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif',
  },
  {
    id: 9,
    name: 'Blastoise',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/9.gif',
  },
  {
    id: 3,
    name: 'Venusaur',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/3.gif',
  },
  {
    id: 94,
    name: 'Gengar',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/94.gif',
  },
  {
    id: 143,
    name: 'Snorlax',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/143.gif',
  },
  {
    id: 130,
    name: 'Gyarados',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/130.gif',
  },
  {
    id: 149,
    name: 'Dragonite',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/149.gif',
  },
  {
    id: 150,
    name: 'Mewtwo',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/150.gif',
  },
  {
    id: 448,
    name: 'Lucario',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/448.gif',
  },
  {
    id: 249,
    name: 'Lugia',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/249.gif',
  },
  {
    id: 384,
    name: 'Rayquaza',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/384.gif',
  },
  {
    id: 257,
    name: 'Blaziken',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/257.gif',
  },
  {
    id: 282,
    name: 'Gardevoir',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/282.gif',
  },
  {
    id: 445,
    name: 'Garchomp',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/445.gif',
  },
  {
    id: 197,
    name: 'Umbreon',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/197.gif',
  },
  {
    id: 658,
    name: 'Greninja',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/658.gif',
  },
  {
    id: 359,
    name: 'Absol',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/359.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/359.gif',
  },
  {
    id: 376,
    name: 'Metagross',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/376.gif',
  },
  {
    id: 493,
    name: 'Arceus',
    spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png',
    animatedUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/493.gif',
  },
];

// Helper to get a random Pokemon from the list
export function getRandomPokemon(): PokemonSpriteData {
  return POKEMON_SPRITES[Math.floor(Math.random() * POKEMON_SPRITES.length)];
}

// Helper to get Pokemon by name
export function getPokemonByName(name: string): PokemonSpriteData | undefined {
  return POKEMON_SPRITES.find(p => p.name.toLowerCase() === name.toLowerCase());
}

// Helper to get Pokemon by ID
export function getPokemonById(id: number): PokemonSpriteData | undefined {
  return POKEMON_SPRITES.find(p => p.id === id);
}
