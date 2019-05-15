// Layout for required fields in the leaf node of B+ Tree.
interface leaf {
    fileOffset: number | null;
    parent: node | null;
    keys: number[];
}

/* 
    Structure for internal nodes of B+ trees.
    Extends `leaf` to avoid complications for child pointers type.
    Child pointer, Can point to both leaf and other internal nodes.
*/
interface node extends leaf {
    childPointers: Array<node | null>[];
    isLeaf: boolean;
}

/*
    Blueprint of B+ Trees
*/
class tree {
    protected root: node;
    
    constructor (readonly bfactor: number) {};
}