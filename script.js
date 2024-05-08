const Node = (data, left = null, right = null) => {
  return { data, left, right };
};

// class implementation

// class Node {
//   constructor(data, left = null, right = null) {
//     this.data = data;
//     this.left = left;
//     this.right = right;
//   }
// }

const removeDuplicate = (arr) => {
  return [...new Set(arr)];
};

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const left = mergeSort(arr.slice(0, Math.floor(arr.length / 2)));
  const right = mergeSort(arr.slice(Math.floor(arr.length / 2)));

  let l = 0;
  let r = 0;
  const ans = [];

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      ans.push(left[l]);
      l++;
    } else {
      ans.push(right[r]);
      r++;
    }
  }
  return ans.concat(left.slice(l)).concat(right.slice(r));
};

const buildTree = (arr) => {
  if (arr.length == 0) return null;

  const mid = Math.floor(arr.length / 2);
  const root = Node(arr[mid]);

  root.left = buildTree(arr.slice(0, mid));
  root.right = buildTree(arr.slice(mid + 1));

  return root;
};

const Tree = (arr) => {
  const arrWithoutDuplicates = removeDuplicate(arr);
  const sortedArr = mergeSort(arrWithoutDuplicates);

  let root = buildTree(sortedArr);

  const insert = (data) => {
    if (!root) {
      root = Node(data);
      return;
    }

    let pointer = root;

    while (true) {
      if (data == pointer.data) return;

      if (data < pointer.data) {
        if (!pointer.left) {
          pointer.left = Node(data);
          break;
        }
        pointer = pointer.left;
      } else {
        if (!pointer.right) {
          pointer.right = Node(data);
          break;
        }
        pointer = pointer.right;
      }
    }
  };

  const findNodeAndParent = (data, node, parent = null) => {
    if (!node) return null;
    if (data == node.data) return { nodeToDelete: node, parent };
    if (data < node.data) {
      return findNodeAndParent(data, node.left, node);
    } else {
      return findNodeAndParent(data, node.right, node);
    }
  };

  const deleteItem = (data) => {
    // if no root node
    if (!root) {
      console.log('The BST is empty!');
      return;
    }

    const { nodeToDelete, parent } = findNodeAndParent(data, root);

    // if target data is not found
    if (!nodeToDelete) {
      console.log('Target is not found! Nothing is deleted');
      return;
    }

    // if target has no children
    if (!nodeToDelete.left && !nodeToDelete.right) {
      if (!parent) {
        root = null;
      } else if (parent.left.data == nodeToDelete.data) {
        parent.left = null;
      } else {
        parent.right = null;
      }

      // when target's right child is occupied
    } else if (nodeToDelete.left == null) {
      if (!parent) {
        root = nodeToDelete.right;
      } else if (parent.left.data == nodeToDelete.data) {
        parent.left = nodeToDelete.right;
      } else {
        parent.right = nodeToDelete.right;
      }

      //when target's left child is occupied
    } else if (nodeToDelete.right == null) {
      if (!parent) {
        root = nodeToDelete.left;
      } else if (parent.left.data == nodeToDelete.data) {
        parent.left = nodeToDelete.left;
      } else {
        parent.right = nodeToDelete.left;
      }

      // when target has both children
    } else {
      let successorParent = nodeToDelete;
      let successor = nodeToDelete.right;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
      nodeToDelete.data = successor.data;
      if (successorParent.left.data == successor.data) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }
  };

  const find = (data) => {
    if (!root) return;

    let pointer = root;

    while (pointer) {
      if (pointer.data == data) {
        return pointer;
      } else if (data < pointer.data) {
        pointer = pointer.left;
      } else {
        pointer = pointer.right;
      }
    }
    console.log('Target not found!');
    return;
  };

  // Iterative Breadth First Search
  const levelOrder = (callback = null) => {
    const nodesArray = [];
    const queue = [root];

    while (queue.length != 0) {
      if (callback) {
        nodesArray.push(callback(queue[0].data));
      } else {
        nodesArray.push(queue[0].data);
      }
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      queue.shift();
    }

    return nodesArray;
  };

  const inOrder = (callback = null) => {
    const traverse = (node, result = []) => {
      if (!node) return result;

      traverse(node.left, result);

      if (callback) result.push(callback(node.data));
      else result.push(node.data);

      traverse(node.right, result);

      return result;
    };
    return traverse(root);
  };

  const preOrder = (callback = null) => {
    const traverse = (node, result = []) => {
      if (!node) return result;

      if (callback) result.push(callback(node.data));
      else result.push(node.data);

      traverse(node.left, result);
      traverse(node.right, result);

      return result;
    };

    return traverse(root);
  };

  const postOrder = (callback = null) => {
    const traverse = (node, result = []) => {
      if (!node) return result;

      traverse(node.left, result);
      traverse(node.right, result);

      if (callback) result.push(callback(node.data));
      else result.push(node.data);

      return result;
    };
    return traverse(root);
  };

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
  };
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

const sample = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(sample.root);
sample.insert(-1);
prettyPrint(sample.root);
sample.deleteItem(-1);
prettyPrint(sample.root);
sample.deleteItem(7);
prettyPrint(sample.root);
sample.deleteItem(8);
prettyPrint(sample.root);
console.log(sample.levelOrder(simpleCallback));

function simpleCallback(value) {
  return value * 2;
}

console.log(sample.preOrder());
console.log(sample.preOrder(simpleCallback));

console.log(sample.inOrder());
console.log(sample.inOrder(simpleCallback));

console.log(sample.postOrder());
console.log(sample.postOrder(simpleCallback));
