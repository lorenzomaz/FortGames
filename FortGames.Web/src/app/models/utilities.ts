export function getApiValidationErrors(errors: any): Array<any> {
  const messages = new Array<any>();
  for (const key of Object.keys(errors)) {
    messages.push({ type: key, message: errors[key].join(',') });
  }
  return messages;
}

export function base64Image(img: string): string | undefined {
  if (img) {
    const identifier = img.charAt(0);
    let extension = '';

    switch (identifier) {
      case 'i':
        extension = 'png';
        break;

      case 'R':
        extension = 'gif';
        break;

      case 'U':
        extension = 'webp';
        break;

      default:
        extension = 'jpeg';
        break;
    }

    return `data:image/${extension};base64,${img}`;
  }

  return '';
}
