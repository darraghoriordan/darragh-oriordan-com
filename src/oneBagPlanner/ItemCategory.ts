import { IItem, WellKnownCategories } from "./IItem"
import { IItemCategory } from "./IItemCategory"
import { calculateTotalWeight } from "./PackingCalculator"
export default class ItemCategory implements IItemCategory {
  public name: WellKnownCategories
  public items: IItem[]

  constructor(name: WellKnownCategories, items: IItem[]) {
    this.name = name
    this.items = items
  }

  public totalWeight(numberOfDays: number): number {
    return calculateTotalWeight(numberOfDays, this.items)
  }
}
