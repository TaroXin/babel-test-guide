const parser = require('@babel/parser')
// cjs require esm
// esm default => require().default
const traverse = require('@babel/traverse').default

const template = `
function add(a, b) {
  return a + b;
}

const res = add(1, 2);
console.log(res);

let test;
let test2 = 'Hello babel!'
`

const ast = parser.parse(template, {
  // unambiguous 猜测的一个模式，猜测你的这个源码是一个什么模式
  // module.exports export
  // module.exports => cjs
  // export import => esm
  sourceType: 'unambiguous',
})

// 方法一：树形结构的遍历
// 方法二：使用babal的官方工具 babel-traverse

// var a = 1, b = 2
traverse(ast, {
  // VariableDeclaration(path, state) {
  //   console.log(path.node.declarations)
  // },
  VariableDeclarator(path) {
    // console.log(path.node.id.name)
    if (path.node.init) {
      console.log(path.node.id.name + ' is be inited !')
    }
  },
  // Identifier(path) {
  //   console.log(path.node.name)
  // },
})
