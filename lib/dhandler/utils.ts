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
    acc[k] = values[k] || null;
    return acc;
  }, ac)
  return ac;
}

export let getSplitPayload = <V>(left: node<V>, right: node<V>, key: string | number) => {
  return { left, right, key };
}

export let getLeftSplit = <V>(
    keys: Array<string | number>, values: indexMap<V>, leaf: boolean = true,
  ): node<V> => {
  let splitIndex = Math.floor(keys.length / 2);
  let leftKeys = keys.slice(0, splitIndex);
  let leftVals = valueFilter<V>(leftKeys, values);
  let obj = {
    keys: leftKeys,
    value: leftVals,
    isLeaf: true,
    childPointers: [],
  }
  if (!leaf) {
    obj.isLeaf = false,
    obj.value = {};
  }
  return obj;
}

export let getRightSplit = <V>(
    keys: Array<string | number>, values: indexMap<V>, leaf: boolean = true,
  ): node<V> => {
  let splitIndex = Math.floor(keys.length / 2);
  let rightKeys = keys.slice(splitIndex, );
  let rightVals = valueFilter<V>(rightKeys, values);
  let obj = {
    keys: rightKeys,
    value: rightVals,
    isLeaf: true,
    childPointers: [],
  }
  if (!leaf) {
    obj.isLeaf = false,
    obj.value = {};
  }
  return obj;
}

export function rInsert<V>(
  this: insertPayload<V>, n: node<V>
): splitPayload<V> | null {
  let temp = getKey(this.key, n.keys);
  let child = n.childPointers[temp];
  if (child == null) {
    n.childPointers[temp] = getNode(
      this.key, true, this.value,
    );
    return null;
  }
  if (!child.isLeaf) {
    let res = rInsert.call(this, child);
    if (res == null) {
      return null;
    }
    let { key, left, right } = res;
    let n = getKey(key, child.keys);
    child.keys = child.keys.slice(0, n).concat([this.key], child.keys.slice(n, ));
    if (child.keys.length < this.maxLength) {
      child.childPointers[n] = left;
      child.childPointers[n + 1] = right;
      return null;
    }
    let leftNode = getLeftSplit<V>(child.keys, {}, false);
    let rightNode = getRightSplit<V>(child.keys, {}, false);
    let splitKey = rightNode.keys[0];
    rightNode.keys = rightNode.keys.slice(1, );
    return getSplitPayload(leftNode, rightNode, splitKey);
  }
  if (child.isLeaf && child.keys.length < this.maxLength) {
    let n = getKey(this.key, child.keys);
    child.keys = child.keys.slice(0, n).concat([this.key], child.keys.slice(n, ));
    child.value[this.key] = this.value;
    return null;
  }
  if (child.isLeaf && child.keys.length >= this.maxLength) {
    let n = getKey(this.key, child.keys);
    child.keys = child.keys.slice(0, n).concat([this.key], child.keys.slice(n, ));
    child.value[this.key] = this.value;
    let leftNode = getLeftSplit(child.keys, child.value);
    let rightNode = getRightSplit(child.keys, child.value);
    return getSplitPayload(leftNode, rightNode, rightNode.keys[0]);
  }
  return null;
}
