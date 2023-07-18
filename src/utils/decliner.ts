export const decliner = (num: number, array: string[]) => {
  const absoluteNum = Math.abs(num);
  const cases = [2, 0, 1, 1, 1, 2];

  const result =
    array[
      absoluteNum % 1 !== 0
        ? 1
        : absoluteNum % 100 > 4 && absoluteNum % 100 < 20
        ? 2
        : cases[absoluteNum % 10 < 5 ? absoluteNum % 10 : 5]
    ];

  return `${num} ${result}`;
};
