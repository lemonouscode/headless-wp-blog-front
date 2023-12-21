import {useQuery, gql} from "@apollo/client"

const GET_CATEGORY_POSTS = gql`
    query MyQuery($id: ID!) {
        category(id: $id, idType: SLUG) {
            name
            posts {
                nodes {
                    slug
                    title
                    content
                    featuredImage {
                        node {
                            sourceUrl
                        }
                    }
                }
            }
        }
    }
`

export const useCategoryBySlug = (someSlug)=>{
    const {error, loading, data:response, refetch} = useQuery(GET_CATEGORY_POSTS, {
        variables:{
            id: someSlug
        }
    })

    const data = response?.category?.posts?.nodes
    const categoryName = response?.category?.name;

    return {error, loading, data, categoryName, refetch}
}