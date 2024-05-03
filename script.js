const Node = (value, left = null, right = null) => {
  return { value, left, right };
};

// class implementation

// class Node {
//   constructor(value, left = null, right = null) {
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   }
// }

const buildTree = (arr) => {
  const mid = Math.floor(arr.length / 2);
  const root = Node(mid);

  if (!arr) return null;

  root.left = buildTree(arr.slice(mid));
  root.right = buildTree(arr.slice(mid + 1, arr.length));

  return root;
};

const Tree = (arr) => {
  const root = buildTree(arr);
  return root;
};

// helper function to print tree, provided by the Odin Project

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
