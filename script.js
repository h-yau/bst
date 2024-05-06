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

  const searchNodeToDeleteAndParent = (target) => {
    let parent = null;
    let pointer = root;
    while (pointer) {
      if (pointer.data == target) {
        return { nodeToDelete: pointer, parentNode: parent };
      }

      parent = pointer;

      if (pointer.data > target) {
        pointer = pointer.left;
      } else {
        pointer = pointer.right;
      }
    }
    return null;
  };

  const searchReplacementNodeAndParent = (nodeToDelete) => {
    // if it has no child
    if (!nodeToDelete.left && !nodeToDelete.right) return null;

    // if it only has one child
    if (
      (!nodeToDelete.left && nodeToDelete.right) ||
      (nodeToDelete.left && !nodeToDelete.right)
    ) {
      return nodeToDelete.left ? nodeToDelete.left : nodeToDelete.right;
    }

    // if it has two children
    let parentToReplacementNode = nodeToDelete;
    let nodeToReplacePointer = nodeToDelete.right;

    while (nodeToReplacePointer.left) {
      parentToReplacementNode = nodeToReplacePointer;
      nodeToReplacePointer = nodeToReplacePointer.left;
    }
    return { replacementNode: nodeToReplacePointer, parentToReplacementNode };
  };

  const deleteItem = (data) => {
    if (!root) return;

    // if left without any deletion, data is not found in the BST

    const { nodeToDelete, parentNode } = searchNodeToDeleteAndParent(data);
    if (!nodeToDelete) {
      return null;
    }

    const { replacementNode, parentToReplacementNode } =
      searchReplacementNodeAndParent(nodeToDelete);

    parentToReplacementNode.left = replacementNode.right;
    replacementNode.right = nodeToDelete.right;
    replacementNode.left = nodeToDelete.left;

    // if the nodeToDelete is the root
    if (!parentNode) {
      root = replacementNode;
    } else {
      parentNode.right = replacementNode;
    }
  };

  return { root, insert, deleteItem };
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
