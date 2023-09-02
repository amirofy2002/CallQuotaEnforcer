export function sleep(miliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('OK');
    }, miliseconds);
  });
}
