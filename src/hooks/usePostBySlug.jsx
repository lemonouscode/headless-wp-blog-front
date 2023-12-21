import {useQuery, gql} from "@apollo/client"

const USE_POST_BY_SLUG = gql`
    query newQuery($slug: String!) 
    {
        postBy(slug: $slug) {
            title
            content
            featuredImage {
                node {
                    sourceUrl
                }
            }
            categories {
                nodes {
                    slug
                }
            }
        }
    }
`

export const usePostsBySlug = (postSlug)=>{
    const {error, loading, data:response, refetch} = useQuery(USE_POST_BY_SLUG, {
        variables:{
            slug: postSlug
        }
    })

    const data = response?.postBy;

    return {error, loading, data, refetch}
}