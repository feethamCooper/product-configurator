export const tryAndCatch = (func: Function, errorMessage: string = "") => {
  try {
    return func();
  } catch (error) {
    onError(errorMessage, error);
  }
};

export const onError = (errorMessage: string = "", error?: any) => {
  console.error(`Error - ${errorMessage}`, error);
};

export const debounce = (func: Function, timeout: number = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
