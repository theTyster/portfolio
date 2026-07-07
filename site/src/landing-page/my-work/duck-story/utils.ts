export const sleep = (time: number): Promise<void> => new Promise(resolve => setTimeout(resolve, time * 1000));

export const listen4Enter = (): Promise<void> => {
  return new Promise<void>(resolve => {
    document.addEventListener("keyup", function enterInputListener(event) {
      if (event.key === "Enter") {
        document.removeEventListener("keyup", enterInputListener);
        resolve();
      }
    });
  });
};

export const getLanguage = (): string => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.language || 'en';
  }
};

export const ranNumG = (max: number): number => {
  return Math.floor(Math.random() * max);
};
