import Cookies from 'js-cookie';

export function setCooikes(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

export function getUserCookies() {
  return {
    appkey: Cookies.get('appkey'),
    email: Cookies.get('email'),
    role: Cookies.get('role'),
    username: Cookies.get('username'),
  };
}

export function removeUserCookies() {
  Cookies.remove('appkey');
  Cookies.remove('email');
  Cookies.remove('role');
  Cookies.remove('username');
  return true;
}
