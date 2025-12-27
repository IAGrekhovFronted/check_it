import { config } from "@services/config/config.service";
import { fetchWithRetries } from "@services/utils/fetchWithRetries";
import { cookies } from "next/headers";
import { KeycloakTokenResponse, Tokens } from "./keycloak.models";

export class KeycloakService {
  private tokenUrl = config.keycloakConfig.urlToken;
  private clientId = config.keycloakConfig.clientId;

  async authByPassword(username: string, password: string) {
    const tokens = await this.getToken({
      grant_type: "password",
      username,
      password,
    });

    await this.storeTokens({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    });
  }

  private async storeTokens(tokens: Tokens) {
    const c = await cookies();

    c.set("access_token", tokens.access_token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    c.set("refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });
  }

  private async getToken(
    body: Record<string, string>
  ): Promise<KeycloakTokenResponse> {
    const response = await fetchWithRetries({
      url: this.tokenUrl,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: new URLSearchParams({
        client_id: this.clientId,
        ...body,
      }),
    });

    if (!response) {
      throw new Error("No response from Keycloak");
    }

    return response.json();
  }
}

export const keycloak = new KeycloakService();
