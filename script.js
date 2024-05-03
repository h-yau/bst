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

  const root = buildTree(sortedArr);
  console.log(root, root.left, root.right);
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

prettyPrint(Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
