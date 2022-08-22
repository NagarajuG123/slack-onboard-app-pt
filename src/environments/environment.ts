export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.APP_ENV || 'development',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    database: {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        name: process.env.POSTGRES_DATABASE,
    },
    slack: {
        appId: process.env.SLACK_APP_ID,
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        botScopes: process.env.SLACK_BOT_SCOPES,
        userScopes: process.env.SLACK_USER_SCOPES
    },
});