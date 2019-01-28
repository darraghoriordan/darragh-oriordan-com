import * as React from "react"
import styled from "styled-components"

interface IProps {
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void
  data: IState
}

const initialState = {
  location: "Ruapehu, New Zealand",
  needAShelter: true,
  needAStove: true,
  numberOfDays: 3,
  tripType: "hiking",
}
const TripLengthContainer = styled.div`
  width: 5em;
`
type IState = Readonly<typeof initialState>

export default class PackingCalculator extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)

    this.setState({ ...props.data })
  }

  public render() {
    return (
      <form>
        <div className="field">
          <label className="label" htmlFor="tripType">
            Trip type
          </label>
          <div className="control">
            <div className="select">
              <select
                name="tripType"
                className="select"
                value={this.props.data.tripType}
                onChange={this.props.onChange}
              >
                <option value="hiking">Hiking</option>
                <option value="bikepacking">Bikepacking</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <TripLengthContainer className="control">
            <label className="label" htmlFor="numberOfDays">
              Trip length (days)
            </label>

            <input
              type="text"
              className="input"
              value={this.props.data.numberOfDays}
              name="numberOfDays"
              onChange={this.props.onChange}
            />
          </TripLengthContainer>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this.props.data.needAStove}
                name="needAStove"
                onChange={this.props.onChange}
              />
              Need a stove
            </label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={this.props.data.needAShelter}
                name="needAShelter"
                onChange={this.props.onChange}
              />
              Need a shelter
            </label>
          </div>
        </div>
      </form>
    )
  }
}
