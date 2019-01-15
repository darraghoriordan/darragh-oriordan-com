import { IItemCategory } from "./IItemCategory"
import { IPackingCalculatorInput } from "./IPackingCalculatorInput"

export interface IPackingCalculatorResult {
  categories: IItemCategory[]
  inputs: IPackingCalculatorInput
  totalWeight(): number
}
