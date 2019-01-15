import { IItem, WellKnownCategories } from "./IItem"
export interface IItemCategory {
  name: WellKnownCategories
  items: IItem[]
  totalWeight(numberOfDays: number): number
}
