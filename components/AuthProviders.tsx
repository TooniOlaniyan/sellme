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
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)

    }

    fetchProviders()

  } , [])
  const [providers , setProviders] = useState<Providers | null>(null)
  if(providers){
   return (
    <div>
      {Object.values(providers).map((provider : Provider , index) => (
        <button onClick={ () => signIn(provider?.id)} key={index}>
          {provider.id}
          
        </button>

      ))}
    </div>
   )
  }
}

export default AuthProviders