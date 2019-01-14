export type WellKnownCategories =
  | "Pack"
  | "Water System"
  | "Shelter"
  | "Sleep System"
  | "Stove"
  | "Cooking"
  | "Toiletries"
  | "Equipment"
  | "Electronics"
  | "Other"
  | "Packed Clothes"
  | "Worn Clothes"
  | "Food"

export interface IItem {
  name: string
  fixedWeight: number
  dailyWeight: number
  category: WellKnownCategories
  tripTypes: string[]
  bringHiking: boolean
  bringBackacking: boolean
}
