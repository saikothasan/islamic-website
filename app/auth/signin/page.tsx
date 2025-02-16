import type { Metadata } from "next"
import { constructMetadata } from "../../metadata.config"
import { SignInForm } from "./sign-in-form"

export const metadata: Metadata = constructMetadata({
  title: "Sign In",
  description: "Sign in to your IslamicHub account",
  path: "/auth/signin",
})

export default function SignInPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Sign In</h1>
        <p className="text-muted-foreground">Sign in to your IslamicHub account</p>
      </div>
      <SignInForm />
    </div>
  )
}

