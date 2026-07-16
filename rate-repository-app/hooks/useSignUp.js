import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from '../src/graphql/mutations'

const useSignUp = () => {

  const [mutate, result] = useMutation(CREATE_USER)
  
  const signUp = async ({ password, username }) => {
    const user = { password, username }
    const { data } = await mutate({ variables: { user } })

    return data
  };

  return [signUp, result]
}

export default useSignUp;