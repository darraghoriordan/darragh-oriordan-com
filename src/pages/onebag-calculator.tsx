import { graphql } from "gatsby"
import * as React from "react"
import Helmet from "react-helmet"
import Layout from "../components/Layout"
import IProfile from "../oneBagPlanner/IProfile"
import {
  calculate,
  getWeightDisplayString,
  totalDailyCalories,
} from "../oneBagPlanner/PackingCalculator"

const initialState = {
  location: "Ruapehu, New Zealand",
  needAShelter: true,
  needAStove: true,
  numberOfDays: 3,
  tripType: "hiking",
}

type IState = Readonly<typeof initialState>
interface IProps {
  // tslint:disable-next-line: prefer-array-literal
  location: any
  data: { site: any; allUsersJson: { edges: Array<{ node: IProfile }> } }
}
export default class PackingCalculator extends React.Component<IProps, IState> {
  public readonly state: IState = initialState

  constructor(props: IProps) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
  }
  public handleInputChange = <T extends keyof IState>(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value =
      event.target.type === "checkbox"
        ? (event.target as any).checked
        : event.target.value
    const newState = {
      [event.target.name]: value,
    }
    this.setState(newState as { [P in T]: IState[P] })
  }

  public render() {
    const pageTitle = "OneBag Packing Calculator"
    const siteTitle = this.props.data.site.siteMetadata.title
    const metaDescription =
      " A tool to help calculate the weight of my pack before a trip"
    const profile: IProfile = this.props.data.allUsersJson.edges.find(
      x => x.node.name === "Darragh"
    )!.node
    const res = calculate(
      {
        needAShelter: this.state.needAShelter,
        needAStove: this.state.needAStove,
        numberOfDays: this.state.numberOfDays,
        tripType: this.state.tripType,
      },
      profile.items
    )

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: metaDescription }]}
          title={pageTitle + " - " + siteTitle}
        />
        <h1>OneBag Calculator</h1>
        <p>Trip Details</p>
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="tripType">
              Trip type
            </label>
            <select
              name="tripType"
              className="form-select"
              value={this.state.tripType}
              onChange={this.handleInputChange}
            >
              <option value="hiking">Hiking</option>
              <option value="bikepacking">Bikepacking</option>
            </select>
          </div>
          <label htmlFor="numberOfDays">Trip length</label>
          <input
            type="text"
            value={this.state.numberOfDays}
            name="numberOfDays"
            onChange={this.handleInputChange}
          />

          <input
            type="checkbox"
            checked={this.state.needAStove}
            name="needAStove"
            onChange={this.handleInputChange}
          />
          <label htmlFor="needAStove">Need a stove</label>

          <input
            type="checkbox"
            checked={this.state.needAShelter}
            name="needAShelter"
            onChange={this.handleInputChange}
          />
          <label htmlFor="needAShelter">Need a shelter</label>
        </form>
        <p>OVERALL TOTAL: {res.totalWeight()}g</p>
        <p>
          Total Daily calories:{" "}
          {totalDailyCalories(
            res.categories.find(x => x.name === "Food")!.items
          )}
        </p>
        {res.categories.map((cat, i) => (
          <div key={i}>
            <h3>{cat.name}</h3>
            <ul>
              {cat.items.map((item, j) => (
                <p key={j}>
                  {item.name} -{" "}
                  {getWeightDisplayString(item, this.state.numberOfDays)}
                </p>
              ))}
            </ul>
            {cat.name === "Food" && (
              <p>Total Daily calories: {totalDailyCalories(cat.items)}</p>
            )}
            TOTAL: {cat.totalWeight(res.inputs.numberOfDays)}g
          </div>
        ))}
      </Layout>
    )
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allUsersJson {
      edges {
        node {
          name
          items {
            name
            fixedWeight
            dailyWeight
            caloriesPerGram
            category
            tripTypes
          }
          trips {
            title
            slug
            location
            durationNights
            needStove
            needShelter
            tripType
          }
        }
      }
    }
  }
`
