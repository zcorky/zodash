// https://github.com/directus/directus/blob/main/packages/sdk-js/src/handlers/auth.ts
export abstract class AuthService {
  public abstract login(): void;
  
  public abstract logout(): void;

  public abstract refresh(): Promise<void>;
}