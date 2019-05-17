///<reference path="./index.d.ts"/>

export function putChildPointers<K, V>(n: node<K, V>, factor: number) {
  for (let i = 0; i < factor + 1; i++) {
    n.childPointers.push(null);
  }
}

export function getNode<K, V>(
    parent: node<K, V>,
    key: K,
    leaf: boolean = false,
    value: V | null = null,
  ): node<K, V> {
  let obj: node<K, V> = {
    parent,
    keys: [key],
    isLeaf: leaf,
    childPointers: [],
    value: value,
  }
  return obj;
}

export function getKey<K>(key: K, keys: K[]): number {
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
