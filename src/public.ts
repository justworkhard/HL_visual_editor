/**
 * 
 * @param number 精度计算
 */
export function menoyAcount(number: number) {
  return parseInt(number.toFixed(0));
}

/**
 * 验证手机号是否合理
 * @param number 
 */
export function checkPhone(phone: string) {
  if (!(/^[1][3,4,5,7,8,6][0-9]{9}$/.test(phone))) {
    console.log(/^[1][3,4,5,7,8,6][0-9]{9}$/.test(phone));
    return false;
  }
  return true;
}

/**
 * 获取url参数
 * @param variable 获取的参数名
 */
export function getQueryVariable(variable: string) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

/**
 * 检查邮箱是否合理
 * @param string 
 */
export function checkEmail(str: string) {
  const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (re.test(str)) {
    return true;
  }
  return false;

}

/**
 * 计算倒计时
 * @param string 
 */
export function getAcountTime(str: string) {
  // let setTime = new Date(str)
  str = str || '';
  const setTime = new Date(str.replace(/\-/g, '/').substr(0, 19));
  const nowTime = new Date();

  const restTime = parseInt(setTime.getTime()) - parseInt(nowTime.getTime());
  if (restTime <= 0) {
    return {
      day: '0',
      hour: '0',
      minu: '0',
    };
  }
  console.log(restTime);

  const day = parseInt(String(restTime / (60 * 60 * 1000 * 24)));
  const hour = parseInt(String(restTime / (60 * 60 * 1000) % 24));
  const minu = parseInt(String(restTime / (60 * 1000) % 60));
  const sec = parseInt(String(restTime / 1000 % 60));
  console.log(day, hour, minu);
  return {
    day: day.toString(),
    hour: hour.toString(),
    minu: minu.toString(),
  };
}
export async function getFormData(object: any) {
  let formdata = new window.FormData();
  for (const key in object) {
    const element = object[key];
    console.log(key, element);
    
   await formdata.append(key, element);
  }
  console.log(formdata);
  
  return formdata
}