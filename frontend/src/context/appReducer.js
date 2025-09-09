import {
  SET_CONTACTS,
  SET_IS_LOADING,
  SET_LOADING_ERROR,
  SET_PAGE_TITLE,
  SET_THEME,
} from "./types";

export default function appReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_THEME:
      return { ...state, theme: payload };
    case SET_PAGE_TITLE:
      return { ...state, pageTitle: payload };
    case SET_CONTACTS:
      return { ...state, contacts: payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    case SET_LOADING_ERROR:
      return { ...state, loadingError: payload };
  }
  throw new Error("Invalid Action" + type);
}

export function setTheme(payload) {
  return { type: SET_THEME, payload };
}
export function setPageTitle(payload) {
  return { type:SET_PAGE_TITLE, payload };
}
export function setContacts(payload) {
  return { type:SET_CONTACTS, payload };
}
export function setIsLoading(payload) {
  return { type: SET_IS_LOADING, payload };
}
export function setLoadingError(payload) {
  return { type:SET_LOADING_ERROR, payload };
}
