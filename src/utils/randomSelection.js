// Pick a random index, avoiding the one just shown when there is more than one item.
export function pickRandomIndex(length, avoid = -1) {
  if (length <= 0) return -1;
  if (length === 1) return 0;
  let i;
  do { i = Math.floor(Math.random() * length); } while (i === avoid);
  return i;
}
