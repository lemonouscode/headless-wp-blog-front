import { useMutation,gql } from '@apollo/client';

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST($input: CreatePostInput!) {
    createPost(input: $input) {
      post {
        id
        title
        date
      }
    }
  }
`;

export const useCreatePostMutation = () => {
  const [createPostMutation, { loading, error }] = useMutation(CREATE_POST_MUTATION);

  const createPost = async (title,content) => {
    try {
      const variables = {
        input: {
          clientMutationId: 'CreatePost',
          title: title,
          content:content,
          status:"PUBLISH"
        },
      };

      const { data } = await createPostMutation({ variables });
      const newPost = data.createPost.post;
      // Handle the newly created post data here
      console.log(newPost);
    } catch (error) {
      // Handle any errors that occurred during the mutation
      console.error(error);
    }
  };

  return { createPost, loading, error };
};

