import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.getItem(key)
}

export const getFromLocalStorageParsed = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : "";
}

export const setStorage = (key: string, value: string): void => {
    if (!key || !value || typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(key, value);
}

export const setToken = (token: string): void => {
    if (!token || typeof window === 'undefined') {
        return;
    }
    setTokenCookie(token);
    localStorage.setItem("accessToken", token);
}

export const setTokenCookie = (token: string): void => {
    setCookie('accessToken', token)
}

export const getToken = () => {
    if (typeof window === 'undefined') {
        return;
    };

    return localStorage.getItem("accessToken") != "" ? localStorage.getItem("accessToken") : null
}

export const getTokenCookie = () => {
    return getCookie('accessToken') !== "" ? getCookie('accessToken') : null;
}

export const setUser = (user: object): void => {
    if (!user || typeof window === 'undefined') {
        return;
    }
    const data = JSON.stringify(user);
    localStorage.setItem("info", data);
}

export const getUser = () => {
    if (typeof window === 'undefined') {
        return;
    }
    const data = localStorage.getItem("info");
    return data ? JSON.parse(data) : {};
}

export const setLanguageStorage = (lang: string | null) => {
    localStorage.setItem("currentLanguage", lang || "");
}

export const getCurrentLanguage = (): string | null => {
    return localStorage.getItem("currentLanguage") || null;
}

export const clearSession = () => {
    deleteCookie("accessToken");
    localStorage.removeItem("i18nextLng");
    localStorage.removeItem("info");
    localStorage.removeItem("accessToken");

}