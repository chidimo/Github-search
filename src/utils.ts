export const formatNumberWithk = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }

  return `${(num / 1000).toFixed(1)}k`.replace('.0', '');
};

export const formatAsNumber = (num: number | bigint): string => {
  if (!num && num !== 0) return '';

  return new Intl.NumberFormat('en-NG', {}).format(num);
};
