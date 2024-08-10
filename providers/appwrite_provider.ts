import { Account, Client } from "react-native-appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('rn-auth-ui')
    .setPlatform("com.biswa.rnauthui");

const account = new Account(client);

export { account }