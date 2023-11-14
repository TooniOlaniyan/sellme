import { ProjectForm } from "@/coomon.types";
import { createProjectMutation, createUserMutation, getUserQuery } from "@/graphql";
import { Query } from "@grafbase/sdk/dist/src/query";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const client = new GraphQLClient(apiUrl);


const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
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


//SEE IF USER EXIST, RETURN USER

export const getUser = (email : string) => {
  client.setHeader('x-api-key' , apiKey)
  return makeGraphQLRequest(getUserQuery , {email})

}

//CREATE NEW USER
export const createUser = (name: string, email: string, avatarUrl: string ) => {
  client.setHeader("x-api-key", apiKey);
  const variables= {
    input:{
      name:name,
      email:email,
      avatarUrl: avatarUrl,
    }
  }

  return makeGraphQLRequest(createUserMutation , variables)
};



//UPLOAD IMAGE TO CLOUDINARY SERVER

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload` , {
      method: 'POST',
      body: JSON.stringify({path: imagePath})
    })
    return response.json()
    
  } catch (error) {
    throw error
    
  }


}

//Fetch user id token

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`)
    return response.json()
    
  } catch (error) {
    throw error
    
  }

}




//ALLOW USER CREATE NEW PROJECT

export const createNewProject = async (form : ProjectForm , creatorId:string , token:string) => {

  const imageUrl = await uploadImage(form.image)
  try {
  if(imageUrl.url){
    client.setHeader('Authorization' , `Bearer ${token}`)

    const variables = {
      input:{
        ...form,
        image: imageUrl.url,
        createdBy:{
          link:creatorId
        }
      }
    }

    return makeGraphQLRequest(createProjectMutation , variables)

  }
    
  } catch (error) {
    
  }
}