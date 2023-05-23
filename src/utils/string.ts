export function strippedHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, '');
}

// export function getDateDiff(dateTimeStamp) {
//   // 时间字符串转时间戳
//   const timestamp = new Date(dateTimeStamp).getTime();
//   const minute = 1000 * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//   const month = day * 30;
//   const year = day * 365;
//   const now = new Date().getTime();
//   const diffValue = now - timestamp;
//   let result;
//   if (diffValue < 0) {
//     return;
//   }
//   const yearC = diffValue / year;
//   const monthC = diffValue / month;
//   const weekC = diffValue / (7 * day);
//   const dayC = diffValue / day;
//   const hourC = diffValue / hour;
//   const minC = diffValue / minute;
//   if (yearC >= 1) {
//     result = '' + parseInt(String(yearC)) + '年前';
//   } else if (monthC >= 1) {
//     result = '' + parseInt(String(monthC)) + '月前';
//   } else if (weekC >= 1) {
//     result = '' + parseInt(String(weekC)) + '周前';
//   } else if (dayC >= 1) {
//     result = '' + parseInt(String(dayC)) + '天前';
//   } else if (hourC >= 1) {
//     result = '' + parseInt(String(hourC)) + '小时前';
//   } else if (minC >= 1) {
//     result = '' + parseInt(String(minC)) + '分钟前';
//   } else result = '刚刚';
//   return result;
// }

export function getDateDiff(time) {
  {
    // 拿到当前的时间戳（毫秒) -- 转换为秒
    const currentTime = new Date();
    const currentTimestamp = parseInt(String(currentTime.getTime() / 1000));

    // 传进来的时间戳（毫秒)
    const t = new Date(time);
    const oldTimestamp = parseInt(String(t.getTime() / 1000));

    // 年
    const oldY = t.getFullYear();
    // 月
    const oldM = t.getMonth() + 1;
    // 日
    const oldD = t.getDate();
    // 时
    const oldH = t.getHours();
    // 分
    const oldi = t.getMinutes();
    // 秒
    t.getSeconds();
    // 相隔多少秒
    const timestampDiff = currentTimestamp - oldTimestamp;
    if (timestampDiff < 60) {
      // 一分钟以内
      return '刚刚';
    }

    if (timestampDiff < 60 * 60) {
      // 一小时以内
      return Math.floor(timestampDiff / 60) + '分钟前';
    }

    // 今天的时间
    if (
      oldY === currentTime.getFullYear() &&
      oldM === currentTime.getMonth() + 1 &&
      oldD === currentTime.getDate()
    ) {
      // 10:22
      return `${zeroize(oldH)}:${zeroize(oldi)}`;
    }

    // 剩下的，就是昨天及以前的数据
    return `${oldY}-${zeroize(oldM)}-${zeroize(oldD)}`;

    // 补0
    function zeroize(num) {
      return num < 10 ? '0' + num : num;
    }
  }
}

export const defaultLogo =
  'https://2023-ase-quadssss-1314332102.cos.ap-beijing.myqcloud.com/logo.png';

export const transparentLogo =
  'https://2023-ase-quadssss-1314332102.cos.ap-beijing.myqcloud.com/logo-vv.png';

export const likeSVG =
  '<svg t="1684684019615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2587" width="16" height="16"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="2588" fill="#9007ff"></path></svg>';

export const whiteLikeSVG =
  '<svg t="1684684019615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2587" width="16" height="16"><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="2588" fill="#ffffff"></path></svg>';
