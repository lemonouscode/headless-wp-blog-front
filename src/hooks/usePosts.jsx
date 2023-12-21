import {useQuery, gql} from "@apollo/client"

const GET_POSTS = gql`
    query NewQuery {
        posts {
            nodes{
                postId
                id
                title
                slug
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
    }
`

export const usePosts = ()=>{
    const {error, loading, data:response, refetch} = useQuery(GET_POSTS);

    const data = response?.posts?.nodes;

    return {error, loading, data, refetch}
}