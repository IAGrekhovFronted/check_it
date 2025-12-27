class ConfigService {
  private readonly keycloakBaseUrl = process.env.KEYCLOAK_BASE_URL!;
  private readonly keycloakRealms = process.env.KEYCLOAK_REALMS!;
  private readonly keycloakClientId = process.env.KEYCLOAK_CLIENT_ID!;

  readonly keycloakConfig = {
    urlToken: `${this.keycloakBaseUrl}/realms/${this.keycloakRealms}/protocol/openid-connect/token`,
    clientId: this.keycloakClientId,
  };
}

export const config = new ConfigService();
