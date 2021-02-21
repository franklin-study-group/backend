declare module NodeJS {
  export interface ProcessEnv {
    CONNECTION_URL: string
    SESSION_SECRET: string
    CORS_ORIGIN: string
    REDIS_URL: string
  }
}
