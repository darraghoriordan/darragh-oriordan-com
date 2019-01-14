import { IItem } from "./IItem"
import { WellKnownCategories } from "./IItem"
import { IItemCategory } from "./IItemCategory"
import { IPackingCalculatorInput } from "./IPackingCalculatorInput"
import { IPackingCalculatorResult } from "./IPackingCalculatorResult"
import ItemCategory from "./ItemCategory"

export default class PackingCalculatorResult
  implements IPackingCalculatorResult {
  public categories: IItemCategory[] = []
  public inputs: IPackingCalculatorInput
  constructor(inputs: IPackingCalculatorInput, items: IItem[]) {
    this.inputs = inputs
    const tripTypeItems = items.filter(i =>
      i.tripTypes.includes(inputs.tripType)
    )

    const excludedCategories = this.getCategoryExclusionList(inputs)

    tripTypeItems.forEach(item => {
      if (excludedCategories.includes(item.category)) {
        return
      }
      let category = this.categories.find(c => c.name === item.category)
      if (!category) {
        category = new ItemCategory(item.category, [])
        this.categories.push(category)
      }

      category.items.push(item)
    })
  }

  public totalWeight() {
    return this.categories.reduce(
      (runningTotal: number, cat: IItemCategory) => {
        return runningTotal + cat.totalWeight(this.inputs.numberOfDays)
      },
      0
    )
  }
  private getCategoryExclusionList(
    inputs: IPackingCalculatorInput
  ): WellKnownCategories[] {
    const excludedCategories: WellKnownCategories[] = []
    if (!inputs.needAShelter) {
      excludedCategories.push("Shelter")
    }
    if (!inputs.needAStove) {
      excludedCategories.push("Stove")
    }
    return excludedCategories
  }
}
