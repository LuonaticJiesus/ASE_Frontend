export function strippedHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, '');
}

export const defaultLogo =
  'https://2023-ase-quadssss-1314332102.cos.ap-beijing.myqcloud.com/logo.png';

export const transparentLogo =
  'https://2023-ase-quadssss-1314332102.cos.ap-beijing.myqcloud.com/logo-vv.png';
