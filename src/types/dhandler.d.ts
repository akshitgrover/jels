interface indexMap<V> {
  [index: string]: V | null;
}

// Layout for required fields in the leaf node of B+ Tree.
interface leaf<V> {
  value?: indexMap<V>;
  keys: (string | number)[];
  next?: node<V> | null;
}

/*
    Structure for internal nodes of B+ trees.
    Extends `leaf` to avoid complications for child pointers type.
    Child pointer, Can point to both leaf and other internal nodes.
*/
interface node<V> extends leaf<V> {
  childPointers?: Array<node<V> | null>;
  isLeaf: boolean;
}

/*
  Structure of object used to insert value in the tree by rInsert util method.
*/
interface insertPayload<V> {
  key: string | number,
  value: V,
  readonly maxLength: number
}

/*
  Structure of payload which is returned between recursive of rInsert.
*/
interface splitPayload<V> {
  key: string | number;
  left: node<V>;
  right: node <V>;
}

/*
    Blueprint of B+ Trees
*/
declare class Tree <V> {
  protected root: node<V>;
  readonly bfactor: number;

  constructor(a: number);
  private _traverse(queue: node<V>[]): string;
  private _traverseLinkedList(node: node<V>): string;
  insert: (key: string | number, value: V) => void;
  traverse: (queue: node<V>[]) => string;
  traverseLinkedList(): string;
}
