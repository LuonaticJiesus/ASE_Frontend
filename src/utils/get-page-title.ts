const title = 'QuadSSSS';

export default function getPageTitle(pageTitle: string | unknown) {
  if (typeof pageTitle === 'string') {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
