'use client'
import { useState , useEffect } from "react"
import { signIn , getProviders } from "next-auth/react"

type Provider = {
  id: string,
  name: string,
  type: string,
  signinUrl: string,
  callbackUrl: string,
  signinUrlParams?: Record<string , string> | null
}
type Providers = Record<string , Provider>

const AuthProviders = () => {
  const [providers , setProviders] = useState<Providers | null>(null)
  return (
    <div>AuthProviders</div>
  )
}

export default AuthProviders