import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Here you would usually fetch the user from a db
        if (credentials?.username === "user" && credentials?.password === "password") {
          return { id: "1", name: "J Smith", email: "jsmith@example.com" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
})

export { handler as GET, handler as POST }

