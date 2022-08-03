export function getApiValidationErrors(errors: any): Array<any> {
  const messages = new Array<any>();
  for (const key of Object.keys(errors)) {
    messages.push({ type: key, message: errors[key].join(',') });
  }
  return messages;
}
