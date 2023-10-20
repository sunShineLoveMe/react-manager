// 数组定义
const list1: number[] = [1, 2, 3]

const list2: Array<number> = [1, 2, 3]

const list3: [number, string, boolean] = [1, 'abc', true]

const list4: [{ name: string; age: number }] = [{ name: 'tom', age: 18 }]

const list5: Array<{ name: string; age: number }> = [{ name: 'tom', age: 18 }]

interface User {
  name: string
  age: number
}

const list6: Array<User> = [{ name: 'tom', age: 18 }]

// 函数类型
function add1(a: number, b: number): number {
  return a + b
}

function add2(a: number, b: number): void {
  // return a + b
  console.log(a + b)
}

function add3(a: number, b: number): unknown {
  throw new Error('error')
}
