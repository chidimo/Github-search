export const QUERY_REPO = `
query searchRepos($searchTerm: String!, $first: Int, $after: String) {
  search(query: $searchTerm, first: $first, after: $after, type: REPOSITORY) {
    repositoryCount
    edges {
      cursor
      node {
        ... on Repository {
          id
          url
          nameWithOwner
          updatedAt
          description
          stargazerCount
          licenseInfo {
            name
          }
          primaryLanguage {
            name
          }
        }
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`;
