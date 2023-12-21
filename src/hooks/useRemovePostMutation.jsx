import { useMutation, gql } from "@apollo/client";

const REMOVE_POST_MUTATION = gql`
    mutation REMOVE_POST($input: DeletePostInput!) {
        deletePost(input: $input) {
            post {
                    id
                }
            }
        }
`

export const useRemovePostMutation = () => {
    const [removePostMutation, { loading, error }] = useMutation(REMOVE_POST_MUTATION);
  
    const removePost = async (id) => {
      try {
        const variables = {
          input: {
            clientMutationId: 'DeletePost',
            id:id
          },
        };
  
        const { data } = await removePostMutation({ variables });
        console.log(data);
      } catch (error) {
        // Handle any errors that occurred during the mutation
        console.error(error);
      }
    };
  
    return { removePost, loading, error };
  };