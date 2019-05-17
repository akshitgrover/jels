export function putChildPointers<V>(n: node<V>, factor: number) {
  for (let i = 0; i < factor + 1; i++) {
    n.childPointers.push(null);
  }
}

export function getNode<V>(
    parent: node<V>,
    key: string | number,
    leaf: boolean = false,
    value: V | null = null,
  ): node<V> {
  let obj: node<V> = {
    parent,
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
