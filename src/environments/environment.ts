export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.APP_ENV || 'development',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  mongoUri: process.env.MONGOOSE_URI,
  slack: {
    appId: process.env.SLACK_APP_ID,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    botScopes: process.env.SLACK_BOT_SCOPES,
    userScopes: process.env.SLACK_USER_SCOPES,
  },
  messagebird: {
    accessKey: process.env.MESSAGE_BIRD_ACCESS_KEY,
    signingSecret: process.env.MESSAGE_BIRD_SIGNING_SECRET,
  },
  rollbar: {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: process.env.ROLLBAR_ENVIRONMENT,
  },
  mail: {
    host: process.env.EMAIL_HOST,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
});
