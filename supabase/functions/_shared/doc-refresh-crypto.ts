const encoder = new TextEncoder();
const decoder = new TextDecoder();
const ENCRYPTION_SECRET = (
  Deno.env.get("DOC_REFRESH_FIRECRAWL_SECRET") ||
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
  ""
)
  .trim();
const ENCRYPTION_SALT = encoder.encode("aix-helper:doc-refresh-firecrawl");

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function deriveEncryptionKey() {
  const secret = ENCRYPTION_SECRET;
  if (!secret) {
    throw new Error("Missing DOC_REFRESH_FIRECRAWL_SECRET or SUPABASE_SERVICE_ROLE_KEY");
  }

  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: ENCRYPTION_SALT,
      iterations: 100_000,
      hash: "SHA-256",
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptDocRefreshSecret(value: string): Promise<string> {
  const key = await deriveEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(value),
    ),
  );
  return `v1.${toBase64(iv)}.${toBase64(ciphertext)}`;
}

export async function decryptDocRefreshSecret(value: string): Promise<string> {
  const [version, ivPart, ciphertextPart] = value.split(".");
  if (version !== "v1" || !ivPart || !ciphertextPart) {
    throw new Error("Unsupported ciphertext format");
  }

  const key = await deriveEncryptionKey();
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(ivPart) },
    key,
    fromBase64(ciphertextPart),
  );

  return decoder.decode(plaintext);
}
