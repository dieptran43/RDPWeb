import { SystemConstants } from './system.constants';
export class ConfigConstants{
    public static config =  {
    "facebook":{
      "authEndpoint": SystemConstants.AUTH_BASE_URL+"/auth/facebook",
      //"clientId":"929055083862567",
      "clientId":"128230904509295",
      "redirectURI" : SystemConstants.AUTH_BASE_URL+"/rdp-portal/signin"
    },
    "google":{
      "authEndpoint": SystemConstants.AUTH_BASE_URL+"/auth/google",
      //"clientId":"77954512562-eftl8up04q1g3aha2mjg5h6bgel9svkk.apps.googleusercontent.com",
      "clientId":"788182042675-8oscd7mlum1v9tord28ov2bap5qr4o9m.apps.googleusercontent.com",
      "redirectURI" : SystemConstants.AUTH_BASE_URL+"/rdp-portal/signin"
    }
  }
}