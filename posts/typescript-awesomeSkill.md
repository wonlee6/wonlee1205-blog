---
title: 'TypeScript usefull Skill'
date: '2023-10-07'
tag: 'Typescript'
description: '7 Awesome TypeScript Types. 알고 있으면 좋은 Typescript Type'
---

## typeof

```ts
const person = 'John'
type Person = typeof person // type Person = "John"
```

## keyof

```ts
const person = {
  name: 'john',
  age: 23
}
type Person = typeof person
// type Person = {
//      name: string
//      age: number
// }

type Person = keyof typeof person // type Person = "name" | "age"
```

## ReturnType

```ts
const fun = () => {
    const val = "string"
    return val
}

type Return = ReturnType<typeof fun> // type Return = string

const fun = async () => {
    ...
}

type Return = Awaited<ReturnType<typeof fun>> // type Return = string
```

## Prettify Type

```ts
interface MainType {
  name: string
  age: number
}

type NestedType = MainType & {
  isDeveloper: boolean
}
// type NestedType = MainType & {
//      isDeveloper: boolean
// }

type PrettifyType<T> = {
  [K in keyof T]: T[K]
} & {}

type Test = PrettifyType<NestedType>
// type Test = {
//     name: string
//     age: number
//     isDeveloper: boolean
// }
```

## Optional Type

```ts
interface Todo {
  title: string
  description: string
}

const updateTodo = (todo: Todo, fieldsToUpdate: Todo) => {
  return {...todo, fieldsToUpdate}
}

const initialTodo: Todo = {
  title: 'clean the dishes',
  description: 'Right Now'
}

const updatedTodo = updateTodo(initialTodo, {description: 'not yet'}) // Error

// change code
const updateTodo = (todo: Todo, fieldsToUpdate: Partial<Todo>) => {
  return {...todo, fieldsToUpdate}
}

// Partial -> Optional
interface Todo {
  title?: string
  description?: string
}

const updatedTodo = updateTodo(initialTodo, {description: 'not yet'})

// Requierd - not optional
const updateTodo = (todo: Todo, fieldsToUpdate: Requierd<Todo>) => {
  return {...todo, fieldsToUpdate}
}
```

## Omit

```ts
interface Todo {
    title: string
    description: string
}

const todo: Todo = {
    title: 'homework'
    description: 'typescript'
}

type Omiited = Omit<Todo, 'title'>
// type Omiited = {
//     description: string
// }
```

```ts
type Shape = {kind: 'circle'; radius: number} | {kind: 'square'; x: number}

type Omitted = Exclude<Shape, {kind: 'circle'}>
// type Omitted = {
//     kind: 'square';
//     x: number;
// }
```
