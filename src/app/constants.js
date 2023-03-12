export const patternEmail = new RegExp(/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/);
export const patternLogin = new RegExp(/[A-Za-z0-9]/);
export const patternNumber = new RegExp(/[0-9]/);
export const patternLettersNumber = new RegExp(/[A-Za-z][0-9]/);
export const pattern = new RegExp(/\d+/);
export const patternLetters = new RegExp(/[A-Z]/g);
export const patternPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
