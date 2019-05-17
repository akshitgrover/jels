import * as util from "./utils";

// Layout for required fields in the leaf node of B+ Tree.
interface leaf<K, V> {
  value: V | null;
  parent: node<V, K> | null;
  keys: K[];
}

/*
    Structure for internal nodes of B+ trees.
    Extends `leaf` to avoid complications for child pointers type.
    Child pointer, Can point to both leaf and other internal nodes.
*/
interface node<K, V> extends leaf<K, V> {
  childPointers: Array<node<K, V> | null>[];
  isLeaf: boolean;
}

/*
    Blueprint of B+ Trees
*/
class tree <K, V> {
  protected root: node<K, V>;

  constructor (readonly bfactor: number = 4) {
    this.root = {
      isLeaf: false,
      childPointers: [],
      value: null,
      parent: null,
      keys: [],
    }
    util.putChildPointers.call(this, bfactor);
  };

  insert = util.insert;
}
