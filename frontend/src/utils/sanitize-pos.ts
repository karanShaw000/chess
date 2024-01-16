export default function sanitizePos(san: string) {
  return san[san.search(/[a-z]\d/g)] + san[san.search(/[a-z]\d/g) + 1];
}
