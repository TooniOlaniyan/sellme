import {getServerSession} from 'next-auth/next'
import {User , NextAuthOptions} from 'next-auth'
import {AdapterUser} from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import  jsonWebToken  from 'jsonwebtoken'
import Jwt  from 'next-auth/jwt'

export const authOptions : NextAuthOptions = {
    providers : [
        GoogleProvider({
            clientId:'',
            clientSecret:''
        })
    ],

    jwt : {
        encode: ({secret , token}) => {

        },
        decode : async ({secret , token}) => {

        }
    },

    theme:{
        colorScheme: 'light',
        logo: '/logo.png'
    },

    callbacks :{
        async session({session}) {
            
        },
        async signIn({user}) {
            
        }
    }
} 