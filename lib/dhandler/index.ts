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
    let res = util.rInsert.call({ key, value, maxLength: this.bfactor }, this.root);
    if (res == null) {
      return;
    }
    let n = util.getKey(res.key, this.root.keys);
    this.root.keys = util.getSplitConcat(res.key, this.root.keys, n);
    this.root.childPointers![n] = res.left;
    this.root.childPointers = util.getSplitConcat(
      res.right, this.root.childPointers!, n + 1,
    );
    if (n > 0 && res.left.isLeaf) {
      this.root.childPointers[n - 1]!.next = res.left;
    }
    if (this.root.keys.length <= this.bfactor) {
      return;
    }
    let leftNode = util.getSplit<V>(
      this.root.keys, this.root.childPointers, {}, "L", false,
    );
    let rightNode = util.getSplit<V>(
      this.root.keys, this.root.childPointers, {}, "R", false,
    );
    let splitKey = rightNode.keys[0];
    rightNode.keys = rightNode.keys.slice(1, );
    this.root = {
      keys: [splitKey],
      childPointers: [leftNode, rightNode],
      isLeaf: false,
    }
  };
}
