export function strippedHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export const defaultLogo =
  'https://2023-ase-quadssss-1314332102.cos.ap-beijing.myqcloud.com/logo.png';
