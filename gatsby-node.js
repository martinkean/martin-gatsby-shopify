const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
  {
    products(first: 5) {
      edges {
        node {
          id
          handle
          variants(first:5) {
            edges {
              node {
                id
                displayName
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  `).then(result => {
    result.data.products.edges.forEach(({ node }) => {
      createPage({
        path: `/product/${node.handle}/`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      })
    })
  })
}