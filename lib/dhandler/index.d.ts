// Layout for required fields in the leaf node of B+ Tree.
interface leaf<K, V> {
  value: V | null;
  parent: node<K, V> | null;
  keys: K[];
}

/*
    Structure for internal nodes of B+ trees.
    Extends `leaf` to avoid complications for child pointers type.
    Child pointer, Can point to both leaf and other internal nodes.
*/
interface node<K, V> extends leaf<K, V> {
  childPointers: Array<node<K, V> | null>;
  isLeaf: boolean;
}

/*
  Structure of object used to insert value in the tree by rInsert util method.
*/
interface insertPayload<K, V> {
  key: K,
  value: V,
  readonly maxLength: number
}

/*
    Blueprint of B+ Trees
*/
declare class tree <K, V> {
  protected root: node<K, V>;
  readonly bfactor: number;

  insert: (key: K, value: V) => void;
}
