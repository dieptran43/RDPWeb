import { SocialUser } from "./social-user";

export interface LoginProvider {
    initialize(): Promise<SocialUser>;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}