import { useMutation, gql } from "@apollo/client";

// Docs for form mutation:
// https://github.com/harness-software/wp-graphql-gravity-forms/blob/develop/docs/submitting-forms.md

const CREATE_SUBMIT_FORM_MUTATION = gql`
    mutation SUBMIT_FORM_ENTRY($input: SubmitGfFormInput!){
        submitGfForm(input: $input){
            confirmation {
                type    
                message 
                url     
            }
            errors {
                id
                message
            }
            entry {
                id
                ... on GfSubmittedEntry {
                    databaseId
                }
                ... on GfDraftEntry {
                    resumeToken
                }
            }
        }
    }
`


export const useContactFormMutation = () => {
    const [createFormMutation, { loading, error }] = useMutation(CREATE_SUBMIT_FORM_MUTATION);
  
    const createSubmitFormEntry = async (formData) => {
  
    //   console.log(formData)
    //   return
      try {
        const variables = {
          input: {
            id: 1,
            fieldValues: [
                {
                id: 2,
                emailValues: {
                        value: formData.email,
                        confirmationValue: formData.email
                    }   
                },
                {
                    // Name -> first and last
                    id: 1,
                    nameValues: {
                        first: formData.fName,
                        last: formData.lName,
                    }
                },
                {
                    // Textarea - contact message text
                    id: 3,
                    value: formData.message
                }
            ],
            saveAsDraft: false,
            sourcePage: 1,
            targetPage: 0
          },
        };

        const { data } = await createFormMutation({ variables });
        return data
        // Handle the newly created post data here
        // console.log(data);
      } catch (error) {
        // Handle any errors that occurred during the mutation
        console.error(error);
      }
    };
  
    return { createSubmitFormEntry, loading, error };
  };
