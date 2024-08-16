import { Account, Client } from "react-native-appwrite";

const ENDPOINT = process.env.EXPO_PUBLIC_API_URL as string;
const PROJECT = process.env.EXPO_PUBLIC_PROJECT_ID as string;
const PLATFORM = process.env.EXPO_PUBLIC_PLATFORM as string;
const REDIRECT_URL = process.env.EXPO_PUBLIC_REDIRECT_URL as string;

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT)
    .setPlatform(PLATFORM);

// Declare your services here
const account = new Account(client);

export { account, REDIRECT_URL }