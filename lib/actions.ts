import { createUserMutation, getUserQuery } from "@/graphql";
import { Query } from "@grafbase/sdk/dist/src/query";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const client = new GraphQLClient(apiUrl);


const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAPHBASE_API_KEY || ""
  : "letmein";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL || ""
  : "http://localhost:3000";

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query , variables)


  } catch (error) {
    throw error;
  }
};

export const getUser = (email : string) => {
  client.setHeader('x-api-key' , apiKey)
  return makeGraphQLRequest(getUserQuery , {email})

}
export const createUser = (name: string, email: string, avaterUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables= {
    input:{
      name,email,avaterUrl 
    }
  }
  return makeGraphQLRequest(createUserMutation , variables)
};