import { graphql } from "gatsby"
import get from "lodash/get"
import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/Layout"

class ResumePage extends React.Component<any, any> {
  public render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")

    const pageTitle = "Resume"
    const metaDescription =
      "Resume for Darragh ORiordan - Fullstack software developor and people leader in Auckland, New Zealand"
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: "en" }}
          meta={[{ name: "description", content: metaDescription }]}
          title={pageTitle + " - " + siteTitle}
        />
        <h1>{pageTitle}</h1>
        <p>
          Hi! Here is my resume, but hit me up on{" "}
          <a href="https://www.linkedin.com/in/darraghoriordan/">
            https://www.linkedin.com/in/darraghoriordan/
          </a>{" "}
          for more info…{" "}
        </p>
        <h2>Work History</h2>
        <h3>Trade Me Ltd</h3>
        <h4>Development Chapter Lead</h4>
        <h5>2015 September to Present</h5>
        <p>
          Helped business by providing technical expertise in areas such as…
        </p>
        <ul>
          <li>Performing technical due diligence for acquisition</li>
          <li>
            Driving Summer of Tech intern engagement which resulted in
            attracting all of our top picks
          </li>
          <li>
            Performing internal audits of APIs and other software to drive
            technical architecture strategy and improvement
          </li>
          <li>
            Performing technical interviews for roles in other locations and
            other departments
          </li>
          <li>
            Interviewing for additional technical lead and managing all 8
            developers while recruiting, I manage 5 developers now that we have
            two leads
          </li>
          <li>Nominated for internal technical excellence award</li>
        </ul>
        <p>Actively developing reports by…</p>
        <ul>
          <li>Peer programming and one on one teaching</li>
          <li>Providing introductory courses for new hires and interns</li>
          <li>
            Running a hackathon type event called Wrench Day for the motors
            organisation
          </li>
          <li>
            Driving reports to spread their knowledge through tutorials and
            laboratories
          </li>
          <li>Mentoring developers in other departments</li>
          <li>
            Ensuring reports are using OKRs, PDPs and skills matrices to guide
            their work and learning
          </li>
          <li>
            Encouraging and organising for reports to go to various conferences
            such as Codemania and Webstock
          </li>
        </ul>
        <p>Improving our product by…</p>
        <ul>
          <li>
            Driving changes to move an internal windows forms application to a
            web based application
          </li>
          <li>
            Writing scripts to make deploy process automatic and
            repeatable(saving ~2 hours/deploy)
          </li>
          <li>Adding swagger to document our API</li>
          <li>
            Adding alpha channel for deploying internal applications to selected
            users for UAT
          </li>
          <li>Bringing our SQL schema into the code repository for auditing</li>
          <li>Creating code review guidelines</li>
          <li>
            Introducing unit testing,DI and actively updated solution with
            examples for devs to use
          </li>
          <li>
            Helping our platform team perform site moves, backups and hardware
            crash recovery
          </li>
          <li>
            Introducing miniprofiler to help developers uncover performance
            issues
          </li>
          <li>
            Rewriting logging to reduce logs by 20 million/day and support
            splunk for monitoring
          </li>
          <li>
            Driving a move to salesforce for our customer management and billing
          </li>
        </ul>
        <h3>Trade Me Ltd</h3>
        <h4>Developer</h4>
        <h5>2014 October to 2015 September</h5>
        <p>
          I was a product developer on the Motors vertical, adding new product,
          fixing bugs. Typical .Net stack with a few different front ends –
          angularJS, bootstrap, Asp.Net MVC and webforms, gulp, teamcity, some
          VB, lots of SQL.
        </p>
        <ul>
          <li>Scrum master for squad of 5</li>
          <li>Shipped Video in listings for direct sellers</li>
          <li>
            Shipped MotorWeb vehicle report integration product for direct
            customers
          </li>
          <li>Shipped Pit Board analytics product for dealers</li>
          <li>
            Shipped Pulse, an award winning FedEx day project providing data
            visualization of user interactions on Trade Me
          </li>
        </ul>
        <h3>Bauer Media</h3>
        <h4>Developer</h4>
        <h5>2013 October to 2014 October</h5>
        <p>
          I was lead developer with one junior on autotrader.co.nz. It’s a full
          Microsoft stack MVC site in C#.
        </p>
        <ul>
          <li>Lead developer for autotrader.co.nz</li>
          <li>
            Continuously added product features from the business while reducing
            tech debt and improving infrastructure
          </li>
          <li>
            Added phone proxy product to hide customer phone numbers from
            scammers
          </li>
          <li>Added new and improved existing advertising</li>
          <li>Full upgrade for mobile site to latest jquery mobile</li>
          <li>Added support for https across the entire site</li>
          <li>
            Added support for white labelling the site to support new partners
            and advertisers
          </li>
          <li>Moved all static content to CDN</li>
          <li>Implemented move to Amazon Web Services cloud infrastructure</li>
          <li>
            Automated the release process with Jenkins and moved build process
            to MSBuild
          </li>
          <li>
            Started first automated tests for product with NUnit and Selenium
          </li>
          <li>Got database schemas versioned in to source control</li>
          <li>
            Played active role in implementing scrum, moving towards continuous
            delivery and reducing sprint length
          </li>
          <li>Mentored junior developers and new team members</li>
        </ul>
        <h3>Travelling</h3>
        <h4>Career Break</h4>
        <h5>2012 December to 2013 October</h5>
        <ul>
          <li>
            I flew to Egypt and rode my bicycle from Cairo to Cape Town as part
            of the 2013 Tour d’Afrique race.
          </li>
          <li>
            I rested the bum and decompressed in South Africa, travelling along
            the the garden route and southern coast to Durban and the
            Drakensbergs. I sailed a delivery yacht from Durban back to Cape
            Town.
          </li>
          <li>
            I returned to Europe for a month to see some music, old friends and
            new sights.
          </li>
          <li>
            Finally I flew to North America and fulfilled a long time wish of
            driving my motorcycle from Toronto to the Arctic circle in the
            Northwest Territories and
          </li>
          <li>
            12, 000km of Canadian wilderness later I finished in Vancouver for a
            flight to Auckland and a life without winter!
          </li>
        </ul>
        <h3>Blackberry Ltd</h3>
        <h4>Developer / System integrator</h4>
        <h5>2009 March to 2012 December</h5>
        <ul>
          <li>
            Designed, developed and managed system to securely track thousands
            of hardware samples, providing full oversight of global hardware
            testing activities.
          </li>
          <li>
            Integrated many external systems including Active Directory,
            Security badges, an automated sample transfer/mailing system and
            legacy Oracle databases.
          </li>
          <li>
            Supported huge growth in RIM’s hardware portfolio and provided
            enormous benefit to the managers and staff including centralized
            process control, audit trails and real time reporting.
          </li>
          <li>
            Designed APIs and tooling that allowed rapid integration of sample
            tracking and test data collection to test software.
          </li>
          <li>
            Improved throughput on RIMs new product programs by designing a
            service oriented, multilayer, secure, automated mailing system for
            transporting sensitive devices around the RIM campus.
          </li>
          <li>
            Provided additional support for test software, which included
            upgrading test systems’ connection stacks to support a completely
            new mobile OS and refactoring code to reduce future maintenance.
          </li>
        </ul>
        <h6>Additional Activities</h6>
        <ul>
          <li>
            Adhered to RIMs strict project execution methodology and
            documentation procedure.
          </li>
          <li>5s + 1 champion.</li>
          <li>Member of the Health &amp; Safety Committee(WSIB Certified).</li>
        </ul>
        <h3>Zenith Technology Ltd</h3>
        <h4>Developer Intern</h4>
        <h5>2007 April to 2008 September</h5>
        <ul>
          <li>
            Designed, developed and managed a custom ASP.NET learning management
            system to improve efficiency in administration of the training
            department for 100 worldwide employees.
          </li>
          <li>
            Administered Windows Server including IIS and Microsoft SQL Server.
          </li>
          <li>
            Created work estimations and task prioritization for management and
            compiled weekly progress reports.Consistently showed ability to self
            – manage.
          </li>
          <li>
            Fixed bugs in VB.NET soft phase code for a new Emerson Delta V
            automation system.
          </li>
          <li>Demonstrated flexibility in working hours and commitment.</li>
          <li>
            Tested DeltaV Hardware, Graphics, Interlocks, Equipment modules and
            phases.
          </li>
          <li>
            Created high quality GAMP documentation to perform the above
            testing.
          </li>
          <li>
            Participated in factory acceptance testing directly with clients.
          </li>
          <li>Supported intensive project work over summer months.</li>
          <li>Practiced safety procedures for industrial environments.</li>
        </ul>
        <h2>Education History</h2>
        <h3>Cork Institute of Technology</h3>
        <h4>Bachelor of Science (Honors) in Computerised Instrumentation</h4>
        <h5>2004 October to 2008 October</h5>
        <p>
          Finished first in class in 1st and final year. Achieved H1.1 grade
        </p>
        <h3>Cork Institute of Technology</h3>
        <h4>Certificate in Electronic Engineering</h4>
        <h5>2001 October to 2004 October</h5>
      </Layout>
    )
  }
}

export default ResumePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
