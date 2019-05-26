import Tree from "../../lib/dhandler/tree";

let t: Tree<number>

beforeAll(() => {
  t = new Tree(2);
});

test("Btree Traversal", () => {
  let t: Tree<number> = new Tree(2);
  t.insert(7, 11);
  t.insert(8, 11);
  expect(t.traverse().trim()).toBe("7 | 7,8 |");
  t.insert(6, 11);
  t.insert(9, 11);
  t.insert(10, 11);
  t.insert(16, 15);
  t.insert(5, 8);
  expect(t.traverse().trim()).toBe("8 | 7 | 9,10 | 5,6 | 7 | 8 | 9 | 10,16 |");
});

test("Btree LinkedList Traversal", () => {
  let t: Tree<number> = new Tree(2);
  t.insert(7, 11);
  t.insert(8, 11);
  expect(t.traverseLinkedList().trim()).toBe("7,8 |");
  t.insert(6, 11);
  t.insert(9, 11);
  t.insert(10, 11);
  t.insert(16, 15);
  t.insert(5, 8);
  expect(t.traverseLinkedList().trim()).toBe("5,6 | 7 | 8 | 9 | 10,16 |");
});

