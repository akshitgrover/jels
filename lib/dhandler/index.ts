// Layout for required fields in the leaf node of B+ Tree.
interface leaf<V, K> {
    value: V | null;
    parent: node<V, K> | null;
    keys: K[];
}

/* 
    Structure for internal nodes of B+ trees.
    Extends `leaf` to avoid complications for child pointers type.
    Child pointer, Can point to both leaf and other internal nodes.
*/
interface node<V, K> extends leaf<V, K> {
    childPointers: Array<node<V, K> | null>[];
    isLeaf: boolean;
}

/*
    Blueprint of B+ Trees
*/
class tree <V, K> {
    protected root: node<V, K>;
    
    constructor (readonly bfactor: number = 4) {
        this.root = {
            isLeaf: false,
            childPointers: [],
            value: null,
            parent: null,
            keys: [],
        }
    };
}