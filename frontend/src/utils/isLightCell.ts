export default function isLightCell(pos: string, index: number): boolean {
  const row = Number(pos.split("")[1]);

  const isEven = (x: number): boolean => {
    return x % 2 === 0 ? true : false;
  };

  if (isEven(row) && isEven(index)) {
    return true;
  } else if (!isEven(row) && !isEven(index)) {
    return true;
  } else return false;
}
