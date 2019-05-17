export function insert<K, V>(key: K, value: V) {
  console.log(this);
  if(this.root.keys.length == 0) {
    this.keys.push(key);
  }
}

export function putChildPointers(factor: number) {
  for (let i = 0; i < factor + 1; i++) {
    this.root.childPointers.push(null);
  }
}
