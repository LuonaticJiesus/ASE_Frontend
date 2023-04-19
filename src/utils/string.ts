export function strippedHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}
