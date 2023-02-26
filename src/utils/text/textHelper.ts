export function convertCamelCaseToPascalCase(text: string) {
  return (
    text
      .replace(/([A-Z])/g, " $1")
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
}
