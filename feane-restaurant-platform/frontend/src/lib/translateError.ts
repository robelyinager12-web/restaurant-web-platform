// File: frontend/src/lib/translateError.ts
// Backend error messages are fixed, known strings (from Zod/ApiError in
// the backend) — this maps the ones we know about to translated versions.
// Anything NOT in this map falls back to the raw backend message, since
// we can't translate arbitrary/unknown text.
import { translations, type Language } from './translations';

const KNOWN_MESSAGES: Record<string, keyof typeof translations.en.errors> = {
  'Validation failed': 'validationFailed',
  'Invalid email or password': 'invalidCredentials',
  'An account with this email already exists': 'emailInUse',
  'Authentication required': 'unauthorized',
  'Invalid or expired token': 'unauthorized',
  'You do not have permission to perform this action': 'forbidden',
};

export function translateError(message: string, language: Language): string {
  const key = KNOWN_MESSAGES[message];
  if (key) return translations[language].errors[key];
  // Message not in our known-fixed-set list (e.g. a 404's specific
  // "Menu item not found" style text) — return as-is rather than guessing.
  return message;
}