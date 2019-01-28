import { IFoodItem } from "./IFoodItem"
import { IItem } from "./IItem"
import { IPackingCalculatorInput } from "./IPackingCalculatorInput"
import { IPackingCalculatorResult } from "./IPackingCalculatorResult"
import PackingCalculatorResult from "./PackingCalculatorResult"

export const calculate = (
  inputs: IPackingCalculatorInput,
  items: IItem[]
): IPackingCalculatorResult => {
  return new PackingCalculatorResult(inputs, items)
}

export const calculateTotalWeight = (
  numberOfDays: number,
  items: IItem[]
): number => {
  return items.reduce<number>((runningTotal: number, i: IItem) => {
    return runningTotal + (i.fixedWeight + i.dailyWeight * numberOfDays)
  }, 0)
}

export const totalDailyCalories = (items: IItem[]): number => {
  let totalCals: number = 0
  items.forEach(item => {
    const foodItem: IFoodItem = item as IFoodItem
    if (foodItem && foodItem.caloriesPerGram) {
      totalCals += foodItem.caloriesPerGram * foodItem.dailyWeight
    }
  })
  return totalCals
}
export const getUnitsPerDayString = (
  item: IItem,
  numberOfDays: number
): string => {
  if (item.unitsPerDay > 0) {
    return `(${item.unitsPerDay} / day - ${item.unitsPerDay *
      numberOfDays} Total)`
  }

  return ""
}
export const getWeightDisplayString = (
  item: IItem,
  numberOfDays: number
): string => {
  let response = ""
  const hasFixedWeight = item.fixedWeight > 0
  const hasDailyWeight = item.dailyWeight > 0

  if (hasFixedWeight) {
    response += `${item.fixedWeight.toString(10)}g`
  }
  if (hasFixedWeight && hasDailyWeight) {
    response += " and "
  }
  if (hasDailyWeight) {
    response += `${item.dailyWeight}g / day`
    if (item.name === "Water") {
      response += ` ( ${item.dailyWeight * 1 + item.fixedWeight}g total )`
    } else {
      response += ` ( ${item.dailyWeight * numberOfDays +
        item.fixedWeight}g total )`
    }
  }
  return response
}
