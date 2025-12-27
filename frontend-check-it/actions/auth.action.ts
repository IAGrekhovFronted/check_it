import { keycloak } from "@services/auth/keycloak.service";

export async function authByPasswod(form: FormData) {
  "use server";

  const usernameEntry = form.get("username");
  const passwordEntry = form.get("password");

  if (typeof usernameEntry !== "string" || typeof passwordEntry !== "string") {
    throw new Error("Invalid form data");
  }

  if (!usernameEntry || !passwordEntry) {
    throw new Error("Empty credentials");
  }

  return keycloak.authByPassword(usernameEntry, passwordEntry);
}
