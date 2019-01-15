import { IItem } from "./IItem"
import { ITrip } from "./ITrip"

export default interface IProfile {
  name: string
  items: IItem[]
  trips: ITrip[]
}
