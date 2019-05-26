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

  private _traverse(queue: node<V>[]): string {
    let str: string = "";
    while(queue.length != 0) {
      str += queue[0].keys.toString() + " | ";
      let cp = queue[0].childPointers || [];
      cp.forEach((c) => {
        if (c) queue.push(c);
      });
      queue = queue.slice(1, );
    }
    return str;
  }

  private _traverseLinkedList(node: node<V>): string {
    let cp;
    if (!node.childPointers) {
      let str = "";
      let n: node<V> | null = node;
      while(n != null) {
        str += n.keys.toString() + " | ";
        n = n.next!;
      }
      return str;
    }
    for (let i = 0; i <  node.childPointers!.length; i++) {
      if (node.childPointers![i] != null) {
        cp = node.childPointers![i];
        break;
      }
    }
    return this._traverseLinkedList(cp);
  }

  traverse(): string {
    let queue = [this.root];
    return this._traverse(queue);
  }

  traverseLinkedList(): string {
    return this._traverseLinkedList(this.root);
  }

}
