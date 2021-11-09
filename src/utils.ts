export const formatNumberWithk = (num: number):string => {
  if (num < 1000) {
    return num.toString();
  }

  return `${(num / 100).toFixed(1)}k`.replace('.0','');
};
