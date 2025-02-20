import { use } from 'react';
import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.lowfield.aora',
    projectId: '67a06a4e00069a6af40f',
    databaseId: '67a06de500359d39d206',
    userCollectionId: '67a06e0200256150c67c',
    videoCollectionId: '67a06e190012e02d2a32',
    storageId: '67a06f39000e687b2083'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export const createUser = async (email, password, username) => {
   try {
     const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
     )

     if(!newAccount) throw Error;
      
     const avatarUrl = avatars.getInitials(username)
     await signIn(email, password);

     const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
     )

   } catch(erropr) {
    console.log(error);
    throw new Error(error);
   }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch(error) {
        throw new Error(error);
    }
}
