export const getUserQuery = `
query GetUser($email:string!){
    user(by:{email:$email}){
        id
        name
        description
        email
        avatarUrl
        githubUrl
        linkedinUrl


    }
}


`;

export const createUserMutation = `
mutation CreateUser($input: UserCreateInput!){
    userCreate(input:$input){
        user{
            name
            email
            id
            description
            avatarUrl
            githubUrl
            linkedinUrl
        }
    }
}


`
