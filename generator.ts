export const randomSAId = (age = random(10, 65)) => {
  const gender = sample([0, 5]);
  const month = random(1, 12 + 1);
  const maxDays =
    month === 2 ? 28 : [1, 3, 5, 7, 8, 10, 12].includes(month) ? 31 : 30;

  const pre = [
    // Birth-date
    yearToYY(2019 - age),
    pad(random(1, 12 + 1)),
    pad(random(1, maxDays + 1)),
    // Gender
    gender,
    // Bunch of random numbers, we don't seem to be checking for specifics
    random(0, 10),
    random(0, 10),
    random(0, 10),
    random(0, 10),
    random(0, 10)
  ].join('');
  const result = [pre, getCheckDigit(pre)].join('');
  return {
    result,
    age,
    gender,
    formatted: idFormatter(result)
  };
};

/**
 *
 * @param min Inclusive
 * @param max Exclusive
 */
const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const pad = (input: number): string => {
  if (input > 10) {
    return input.toString();
  }
  return `0${input}`;
};

const yearToYY = (year: number) => {
  const asString = year.toString();
  return [asString[2], asString[3]].join('');
};

const sample = (arr: any[]) => {
  return arr[random(0, arr.length)];
};

export function getCheckDigit(idNumber: string): number {
  const idDigits = toDigits(idNumber);

  const oddSum = idDigits.reduce((p, c, i) => (i % 2 === 1 ? p : p + c), 0);
  const evenProduct =
    parseInt(
      idDigits.reduce((p, c, i) => (i % 2 === 0 ? p : `${p}${c}`), ''),
      10
    ) * 2;
  const evenSum = toDigits(evenProduct).reduce((p, c) => p + c, 0);

  const total = oddSum + evenSum;
  const checkDigit = (10 - (total % 10)) % 10;

  return checkDigit;
}

function toDigits(input: any): number[] {
  return input
    .toString()
    .split('')
    .map((v: string) => parseInt(v, 10));
}

export const idFormatter = (id: string): string => {
  return id.replace(/(\d{6})(\d{4})(\d{3})/, '$1 $2 $3');
};
