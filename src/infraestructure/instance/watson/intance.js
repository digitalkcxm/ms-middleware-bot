import AssistantV2 from "ibm-watson/assistant/v2.js";
import { IamAuthenticator } from "ibm-watson/auth/index.js";

const instanceWatson = (apiKey) => {
  return new AssistantV2({
    version: "2020-04-01",
    authenticator: new IamAuthenticator({
      apikey: apiKey,
    }),
    serviceUrl: "https://api.us-south.assistant.watson.cloud.ibm.com",
    // disableSslVerification: true,
  });
};

export default instanceWatson;
