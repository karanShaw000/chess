import { MoveType } from "@/store/chess/chessSlice";

export function filterRedundantObject(inputArray: MoveType[]) {
  // Use a Set to keep track of unique objects
  const uniqueObjects = new Set();

  // Filter out redundant objects
  const filteredArray = inputArray.filter((obj) => {
    const key = JSON.stringify(obj);
    if (!uniqueObjects.has(key)) {
      uniqueObjects.add(key);
      return true;
    }
    return false;
  });

  return filteredArray;
}
