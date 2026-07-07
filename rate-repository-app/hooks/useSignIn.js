import { useMutation } from "@apollo/client/react";
import { AUTHENTICATE } from '../src/graphql/mutations'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  
  const signIn = async ({ username, password }) => {
    const credentials = { username, password }

    await mutate({ variables: { credentials } })
    return result
  };

  return [signIn, result]
}

export default useSignIn;