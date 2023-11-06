import {getServerSession} from 'next-auth/next'
import {User , NextAuthOptions} from 'next-auth'
import {AdapterUser} from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import  jsonWebToken  from 'jsonwebtoken'
import Jwt  from 'next-auth/jwt'
import { SessionInterface } from '@/coomon.types'


export async function getCurretUser() {
    const session = await getServerSession(authOptions) as SessionInterface

    return session

    
}

export const authOptions : NextAuthOptions = {
    providers : [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
            
        })
    ],

    // jwt : {
    //     encode: ({secret , token}) => {

    //     },
    //     decode : async ({secret , token}) => {

    //     }
    // },

    theme:{
        colorScheme: 'light',
        logo: '/logo.png'
    },

    callbacks :{
        async session({session}) {
            return session
            
        },
        async signIn({user} : {user : AdapterUser | User} ) {
            try {
                //fetch user
                // if user doesnt exixt we create a new user
                // return user

                return true
                
            } catch (error) {
                // something went wrong
                return false
                
            }
            
        }
    }
} 
