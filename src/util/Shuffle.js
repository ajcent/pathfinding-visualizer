export default function shuffle(array) {
  let random,
    current = array.length;

  while (current !== 0) {
    random = Math.floor(Math.random() * current);
    current--;
    [array[current], array[random]] = [array[random], array[current]];
  }

  return array;
}
