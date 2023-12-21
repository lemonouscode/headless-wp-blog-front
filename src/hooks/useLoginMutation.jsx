import { useMutation, gql } from "@apollo/client";

const LOGIN_ADMIN_MUTATION = gql`
    mutation LOGIN_ADMIN($username: String!, $password: String!){
        login(input: {password: $password, username: $username}) {
            authToken
        }
    }
`

export const useLoginMutation = () => {
    const [loginAdminMutation, { loading, error }] = useMutation(LOGIN_ADMIN_MUTATION);
  
    const login = async (username,password) => {

      try {
        const variables = {
          username:username,
          password:password
        };
  
        const { data } = await loginAdminMutation({ variables });
        
        // Handle the auth token
        const token = data.login.authToken

        return token;
      } catch (error) {
        // Handle any errors that occurred during the mutation
        console.error(error);
      }
    };
  
    return { login, loading, error };
  };
  