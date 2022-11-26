export function capitalize<T extends string>(string: T): Capitalize<T> {
  return (string.charAt(0).toUpperCase() +
    string.slice(1).toLowerCase()) as Capitalize<T>;
}
