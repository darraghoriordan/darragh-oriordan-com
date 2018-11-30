import React from "react";
import PropTypes from "prop-types";
import Main from "../components/Main/";
import { connect } from "react-redux";
import "core-js/fn/array/find";
import "prismjs/themes/prism-okaidia.css";
import { graphql } from "gatsby"
import { setNavigatorPosition, setNavigatorShape } from "../state/store";
import { moveNavigatorAside } from "../utils/shared";
import Post from "../components/Post/";
import Footer from "../components/Footer/";
import Seo from "../components/Seo";
import Layout from "../components/layout"

class PostTemplate extends React.Component {
  moveNavigatorAside = moveNavigatorAside.bind(this);

  componentDidMount() {
    if (this.props.navigatorPosition === "is-featured") {
      this.moveNavigatorAside();
    }
  }

  render() {
    const { data, pageContext } = this.props;
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook;

    return (
      <Layout>
      <Main>
            <Post post={data.post} slug={pageContext.slug} author={data.author} />
            <Footer footnote={data.footnote} />
            <Seo data={data.post} facebook={facebook} />
      </Main>
      </Layout>
    );
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired
};

export const query=graphql`
query PostBySlug($slug: String!) {
  post: markdownRemark(fields: { slug: { eq: $slug } }) {
    id
    html
    fields {
      slug
      prefix
    }
    frontmatter {
      title
      subTitle
      date
      description
      cover {
        childImageSharp {
          resize(width: 300) {
            src
          }
        }
      }
    }
  }
  author: markdownRemark(fileAbsolutePath: { regex: "/author/" }) {
    id
    html
  }
  footnote: markdownRemark(fileAbsolutePath: { regex: "/footnote/" }) {
    id
    html
  }
  site {
    siteMetadata {
      facebook {
        appId
      }
    }
  }
}
`


const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    isWideScreen: state.isWideScreen
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape
};

export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate);
