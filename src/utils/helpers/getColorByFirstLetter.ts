import colors from "@/lib/constants/getColor";

export function getColorByFirstLetter(input: string) {
  if (!input) return colors[26];
  const firstLetter = input?.charAt(0)?.toUpperCase();
  const letterIndex = firstLetter?.charCodeAt(0) - 65;

  if (letterIndex >= 0 && letterIndex < 26) {
    return colors[letterIndex];
  } else {
    return colors[26];
  }
}
