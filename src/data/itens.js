// Itens que o painel acompanha nesta primeira versão.
// O "base" é o ID do item sem o tier: o tier (T4 a T8) entra na frente.
// Ex: base "BAG" + tier 5 → "T5_BAG"
export const ITENS = [
  { base: 'BAG', nome: 'Bolsa', categoria: 'Acessório' },
  { base: 'CAPE', nome: 'Capa', categoria: 'Acessório' },
  { base: 'MAIN_SWORD', nome: 'Espada Larga', categoria: 'Arma' },
  { base: '2H_CLAYMORE', nome: 'Montante', categoria: 'Arma' },
  { base: '2H_BOW', nome: 'Arco', categoria: 'Arma' },
  { base: 'MAIN_FIRESTAFF', nome: 'Cajado de Fogo', categoria: 'Arma' },
  { base: 'HEAD_PLATE_SET1', nome: 'Elmo de Soldado', categoria: 'Armadura' },
  { base: 'ARMOR_PLATE_SET1', nome: 'Armadura de Soldado', categoria: 'Armadura' },
  { base: 'SHOES_PLATE_SET1', nome: 'Botas de Soldado', categoria: 'Armadura' },
  { base: 'ARMOR_LEATHER_SET1', nome: 'Jaqueta de Mercenário', categoria: 'Armadura' },
  { base: 'ARMOR_CLOTH_SET1', nome: 'Robe de Erudito', categoria: 'Armadura' },
]

export const TIERS = [4, 5, 6, 7, 8]

export function montarId(base, tier) {
  return `T${tier}_${base}`
}

export function buscarItemPorBase(base) {
  return ITENS.find((item) => item.base === base)
}
