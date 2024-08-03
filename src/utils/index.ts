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
