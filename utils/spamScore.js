export function spamScore(text) {
  let score = 0;

  if (!text) return 10;

  const lower = text.toLowerCase();

  if (lower.includes("free")) score += 3;
  if (lower.includes("win")) score += 3;
  if (lower.includes("money")) score += 2;
  if (lower.includes("http")) score += 2;
  if (text.length < 15) score += 2;

  return score;
}