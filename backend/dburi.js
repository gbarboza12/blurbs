const secrets = {
    dbUri: 'mongodb://admin:password1@ds139921.mlab.com:39921/blurbs'
  };
  
  export const getSecret = key => secrets[key];

