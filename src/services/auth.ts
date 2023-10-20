import useDatabaseAdapter from "@hooks/useDatabaseAdapter"

const AuthService = {
   signInPassword: async (email: string, password: string ) => {
      const databaseAdapter = useDatabaseAdapter()
      const { data, error } = await databaseAdapter.signInWithPassword(email, password)
      if (error) {
         console.log(error)
         throw new Error('Something went wrong when sign in')
      }
      return data
   },

   signUpWithEmail: async (email: string, password: string) => {
      const databaseAdapter = useDatabaseAdapter()
      const { data, error } = await databaseAdapter.signUp(email, password)
      if (error) {
         console.log(error)
         throw new Error('Something went wrong when sign up new user')
      }
      return data
   },
}

export default AuthService