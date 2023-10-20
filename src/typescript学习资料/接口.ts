interface Person {
  name: string
  age: number
}

const jack: Person = {
  name: 'jack',
  age: 18,
}
interface P {
  readonly name: string
  age: number
}

const lily: P = {
  name: 'lily',
  age: 18,
}

// lily.name = 'tome'
interface User {
  id: number
  name: string
  age: number
}

type AgeType = Pick<User, 'name' | 'age'>

const Jack: AgeType = {
  name: 'tom',
  age: 18,
}
