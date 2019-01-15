import { graphql } from "gatsby"
import * as React from "react"
import Helmet from "react-helmet"
import { IItem } from "src/oneBagPlanner/IItem"
import Layout from "../components/Layout"
import TripInput from "../components/onebagCalculator/TripInput"
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
        <h1 className="title">OneBag Calculator</h1>
        <div className="container">
          <p>Trip Details</p>
          <TripInput onChange={this.handleInputChange} data={this.state} />
        </div>
        <div className="container">
          <p>OVERALL TOTAL: {res.totalWeight()}g</p>
          <p>
            Total Daily calories:{" "}
            {totalDailyCalories(
              res.categories.find(x => x.name === "Food")!.items
            )}
          </p>
          <div className="container">
            <hr />
            <div className="columns is-multiline">
              {res.categories.map((cat, i) => (
                <div className="column is-one-third" key={i}>
                  <h3 className="title is-5">{cat.name}</h3>
                  <table className="table is-narrow">
                    <tbody>
                      {cat.items
                        .sort((a: IItem, b: IItem) => {
                          if (a.dailyWeight > 0) {
                            return b.dailyWeight - a.dailyWeight
                          }

                          return b.fixedWeight - a.fixedWeight
                        })
                        .map((item, j) => (
                          <tr key={j}>
                            <td>{item.name}</td>
                            <td>
                              {" "}
                              {getWeightDisplayString(
                                item,
                                this.state.numberOfDays
                              )}
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td>{cat.totalWeight(res.inputs.numberOfDays)}g </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
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
