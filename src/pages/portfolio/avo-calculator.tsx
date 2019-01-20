import React from "react"
import Layout from "../../components/Layout"
import SEOConfiguration from "../../components/SEOConfiguration"

class PortfolioIndex extends React.Component<any, any> {
  public render() {
    const pageTitle = "Avo calculator"
    const metaDescription =
      "Calculate how many avo breakfasts your house will cost"
    return (
      <Layout>
        <SEOConfiguration description={metaDescription} title={pageTitle} />
        <h1>{pageTitle}</h1>
        <h2>Simple-As house deposits</h2>
        <p>
          Ever wonder how many avocado breakfasts it will take you to buy a
          house? Just use our handy calculator to figure it out for New Zealand.
        </p>

        <h2>Check it out</h2>
        <p>
          You can see it running here:{" "}
          <a href="http://avocalc.darraghoriordan.com/">
            http://avocalc.darraghoriordan.com/
          </a>
        </p>
        <p>
          The code is here:{" "}
          <a href="https://github.com/darraghoriordan/how-many-avos">
            https://github.com/darraghoriordan/how-many-avos
          </a>
        </p>
        <h2>Thanks</h2>
        <p>Design by Billie Charlton</p>
      </Layout>
    )
  }
}

export default PortfolioIndex
