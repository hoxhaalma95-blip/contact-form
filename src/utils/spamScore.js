export function spamScore(text = "") {
  let score = 0;

  const msg = text.toLowerCase();

  if (msg.includes("free")) score += 3;
  if (msg.includes("win")) score += 3;
  if (msg.includes("money")) score += 2;
  if (msg.includes("http")) score += 2;
  if (msg.length < 15) score += 2;

  return score;
}