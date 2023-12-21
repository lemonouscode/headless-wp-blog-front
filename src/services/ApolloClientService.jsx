import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export class ApolloClientService {
    constructor() {
        const httpLink = createHttpLink({
            // uri: 'http://localhost:3000/',
            uri: import.meta.env.VITE_SERVER_URL + "/graphql"
        });

        const authLink = setContext((_, { headers }) => {

            // First try to obtain token
            const token = localStorage.getItem("jwt_token");
            let customHeaders = {};

            if (token) {
                const alteredToken = token.replace(/"/g, "");
                customHeaders = { authorization: `Bearer ${alteredToken}` };
            }

            return {
                headers: {
                    ...headers,
                    ...customHeaders
                    // authorization: token ? `Bearer ${alteredToken}` : "",
                },
            };
        });

        this.client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });

        return this.client;
    }
}



