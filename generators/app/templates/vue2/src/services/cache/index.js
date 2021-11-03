import Cookies from 'js-cookie';
import { LANGUAGE_KEY } from '@/config/constants/settings';

// 保存和删除cookie
export const addCookie = (key, value) => Cookies.set(key, value);
export const getCookie = key => { return Cookies.get(key) };
export const removeCookie = key => Cookies.remove(key);

export const getLanguage = () => Cookies.get(LANGUAGE_KEY);
export const setLanguage = language => Cookies.set(LANGUAGE_KEY, language);

export const saveToLocalStorage = (name, content) =>
  window.localStorage.setItem(name, JSON.stringify(content));
export const readFromLocalStorage = name => JSON.parse(window.localStorage.getItem(name));
export const cleanLocalStorage = name => window.localStorage.removeItem(name);
