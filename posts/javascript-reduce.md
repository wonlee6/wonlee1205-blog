---
title: 'Js - Reduce'
date: '2024-07-04'
tag: 'Javascript'
description: 'reduce is goat. use case'
---

> reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
> ![reduce](https://www.freecodecamp.org/news/content/images/2019/10/folding-box.gif)

## Summing Numbers

```js
const numbers: number[] = [1, 2, 3, 4, 5];
const sum: number = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // Output: 15
```

## Flattening Arrays

```js
const nestedArray: number[][] = [[1, 2], [3, 4], [5, 6]];
const flattenedArray: number[] = nestedArray.reduce((acc, curr) => acc.concat(curr), []);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]
```

## Grouping Objects

```js
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'Dave', age: 30 }
];

const groupedByAge: { [key: number]: Person[] } = people.reduce((acc, curr) => {
  if (!acc[curr.age]) {
    acc[curr.age] = [];
  }
  acc[curr.age].push(curr);
  return acc;
}, {});

console.log(groupedByAge);
/*
Output:
{
  '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
  '30': [{ name: 'Bob', age: 30 }, { name: 'Dave', age: 30 }]
}
*/
```

## Creating Lookup Maps

```js
interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Tablet', price: 499 },
];

const productMap: { [key: number]: Product } = products.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});

console.log(productMap);
/*
Output:
{
  '1': { id: 1, name: 'Laptop', price: 999 },
  '2': { id: 2, name: 'Phone', price: 699 },
  '3': { id: 3, name: 'Tablet', price: 499 }
}
*/

// Accessing a product by ID
const laptop: Product = productMap[1];
console.log(laptop); // Output: { id: 1, name: 'Laptop', price: 999 }
```

## Counting Occurrences

```js
const fruits: string[] = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const fruitCounts: { [key: string]: number } = fruits.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});

console.log(fruitCounts);
/*
Output:
{
  'apple': 3,
  'banana': 2,
  'orange': 1
}
*/
```

## Composing Functions

```js
const add5 = (x: number): number => x + 5;
const multiply3 = (x: number): number => x * 3;
const subtract2 = (x: number): number => x - 2;

const composedFunctions: ((x: number) => number)[] = [add5, multiply3, subtract2];

const result: number = composedFunctions.reduce((acc, curr) => curr(acc), 10);
console.log(result); // Output: 43
```

## Implementing a Simple Redux-like State Management

```js
interface State {
  count: number;
  todos: string[];
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  count: 0,
  todos: [],
};

const actions: Action[] = [
  { type: 'INCREMENT_COUNT' },
  { type: 'ADD_TODO', payload: 'Learn Array.reduce()' },
  { type: 'INCREMENT_COUNT' },
  { type: 'ADD_TODO', payload: 'Master TypeScript' },
];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return { ...state, count: state.count + 1 };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
};

const finalState: State = actions.reduce(reducer, initialState);
console.log(finalState);
/*
Output:
{
  count: 2,
  todos: ['Learn Array.reduce()', 'Master TypeScript']
}
*/
```

## Generating Unique Values

```js
const numbers: number[] = [1, 2, 3, 2, 4, 3, 5, 1, 6];

const uniqueNumbers: number[] = numbers.reduce((acc, curr) => {
  if (!acc.includes(curr)) {
    acc.push(curr);
  }
  return acc;
}, []);

console.log(uniqueNumbers); // Output: [1, 2, 3, 4, 5, 6]
```

## Calculating Average

```js
const grades: number[] = [85, 90, 92, 88, 95];

const average: number = grades.reduce((acc, curr, index, array) => {
  acc += curr;
  if (index === array.length - 1) {
    return acc / array.length;
  }
  return acc;
}, 0);

console.log(average); // Output: 90
```

## 주의

```js
const numbers: number[] = [1, 2, 3, 4, 5];

const doubledNumbers: number[] = numbers.reduce((acc, curr) => {
  return [...acc, curr * 2];
}, []);

console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]
```

```js
const numbers: number[] = [1, 2, 3, 4, 5];

const doubledNumbers: number[] = numbers.reduce((acc, curr) => {
  acc.push(curr * 2);
  return acc;
}, []);

console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]
```

스프레드 연산자 보다는 `push`를 이용하여 매번 새로운 배열을 만들지 않아도 되므로 성능에 좀더 좋다.

객체도 마찬가지

```js
const people: Person[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'Dave', age: 30 }
];

const groupedByAge: { [key: number]: Person[] } = people.reduce((acc, curr) => {
  if (!acc[curr.age]) {
    acc[curr.age] = [];
  }
  acc[curr.age].push(curr);
  return acc;
}, {});
```
