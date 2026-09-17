/**
 * Lightweight public Firestore reads via REST — avoids shipping the ~300KB
 * Firebase JS SDK on marketing pages (Lighthouse "unused JavaScript").
 * Admin write paths still use the modular SDK in src/firebase.js.
 */

const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const parseValue = (value) => {
  if (value == null) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('nullValue' in value) return null;
  if ('timestampValue' in value) return value.timestampValue;
  if ('arrayValue' in value) {
    return (value.arrayValue.values || []).map(parseValue);
  }
  if ('mapValue' in value) {
    return parseFields(value.mapValue.fields || {});
  }
  return null;
};

const parseFields = (fields = {}) => {
  const out = {};
  for (const [key, value] of Object.entries(fields)) {
    out[key] = parseValue(value);
  }
  return out;
};

const parseDocument = (doc) => {
  const id = doc.name?.split('/').pop();
  return { id, ...parseFields(doc.fields) };
};

/**
 * List all documents in a collection (public read rules required).
 * @param {string} collectionId
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export const listDocuments = async (collectionId) => {
  if (!projectId) {
    throw new Error('VITE_FIREBASE_PROJECT_ID is not set');
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionId}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Firestore REST list failed (${res.status})`);
  }

  const data = await res.json();
  return (data.documents || []).map(parseDocument);
};
