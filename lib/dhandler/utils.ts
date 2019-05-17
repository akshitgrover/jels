export function putChildPointers<V>(n: node<V>, factor: number) {
  for (let i = 0; i < factor + 1; i++) {
    n.childPointers.push(null);
  }
}

export function getNode<V>(
    key: string | number,
    leaf: boolean = false,
    value: V | null = null,
  ): node<V> {
  let obj: node<V> = {
    keys: [key],
    isLeaf: leaf,
    childPointers: [],
    value: {},
  }
  obj.value[key] = value;
  return obj;
}

export function getKey(key: string | number, keys: (string | number)[]): number {
  let temp: number = 0;
  for (let i = 0; i < keys.length; i++) {
    temp = i;
    if (keys[i] < key) {
      break;
    }
  }
  if (keys[temp] < key) {
    temp += 1;
  }
  return temp;
}

let valueFilter = <V>(keys: (string | number)[], values: indexMap<V>): indexMap<V> => {
  let ac: indexMap<V> = {};
  keys.reduce((acc, k) => {
    acc[k] = values[k];
    return acc;
  }, ac)
  return ac;
}

let getSplitpayload = <V>(left: node<V>, right: node<V>, key: string | number) => {
  return { left, right, key };
}

let getLeftSplit = <V>(keys: Array<string | number>, values: indexMap<V>): node<V> => {
  let splitIndex = Math.floor(keys.length / 2);
  let leftKeys = keys.slice(0, splitIndex);
  let leftVals = valueFilter<V>(leftKeys, values);
  return {
    keys: leftKeys,
    value: leftVals,
    isLeaf: true,
    childPointers: [],
  }

}

let getRightSplit = <V>(keys: Array<string | number>, values: indexMap<V>): node<V> => {
  let splitIndex = Math.floor(keys.length / 2);
  let rightKeys = keys.slice(splitIndex, );
  let rightVals = valueFilter<V>(rightKeys, values);
  return {
    keys: rightKeys,
    value: rightVals,
    isLeaf: true,
    childPointers: [],
  }
}
