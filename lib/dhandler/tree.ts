///<reference path="./index.d.ts"/>

import * as util from "./utils";

/*
    Blueprint of B+ Trees
*/
class tree <V> {
  root: node<V>;

  constructor (readonly bfactor: number = 4) {
    this.root = {
      isLeaf: false,
      childPointers: [],
      keys: [],
    }
    util.putChildPointers(this.root, bfactor);
  };

  insert(key: string | number, value: V): void {
    if (this.root.keys.length == 0) {
      this.root.keys.push(key);
      this.root.childPointers![1] = util.getNode<V>(
        key, true, value,
      );
      return;
    }
    let res = util.childIsNotLeaf.call({ key, value, maxLength: this.bfactor }, this.root);
    if (res != null) {
      this.root = {
        keys: [res.key],
        childPointers: [res.left, res.right],
        isLeaf: false,
      }
    }
    return;
  };
}
