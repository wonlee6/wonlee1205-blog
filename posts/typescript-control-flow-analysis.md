---
title: 'Cheat Sheet - Control Flow Analysis'
date: '2024-07-13'
tag: ['typescript']
description: 'typescript Cheat Sheet - Control Flow Analysis'
---

## Statements

### typeof

```ts
const input = getUserInfo();
input // string | number

if (typof input === "string") {
	input // string
}
```

### instanceof

```ts
const input = getUserInfo()
input // string | number[]

if (input instanceof Array) {
  input // number[]
}
```

### "property" in Object

```ts
const input = getUserInfo()
input // string | { error: ... }

if ('error' in input) {
  input // { error: ... }
}
```

### type-guard functions

```ts
const input = getUserInfo()
input // number | number[]

if (Array.isArray(input)) {
  input // number[]
}
```

## discriminated Unions

```ts
type Response = {
	| {status: 200, data: any}
	| {status: 301, to: string}
	| {status: 400, error: Error}
}

const response = getResonse();
response // Response

switch(response.status) {
	case 200: return response.data;
	case 301: return response.to;
	case 400: return response.error;
}
```

## Type Guards

> is

```ts
function isErrorResponse(obj: Response): obj is APIErrorResponse {
  return obj instanceof APIErrorResponse
}

const response = getResonse()
response // Response | APIErrorResponse

if (isErrorResponse(response)) {
  response // APIErrorResponse
}
```

## Assertion Functions

```ts
function assertResponse(obj: Response): asserts obj is SuccessResponse {
  if (!(obj instanceof SuccessResponse)) {
    throw new Error('Not a success!')
  }
}

const response = getResonse()
response // SuccessResponse | ErrorResponse

assertResponse(response) // assert function change the current scope or throw

res // SuccessResponse
```

## Assignment

### narrowing types using 'as const'

```ts
const data1 = {
	name: "hello"
};

typof data1 = {
	name: string;
};

const data2 = {
	name: "hello"
} as const;

typof data2 = {
	name: "hello";
};
```

### Tracks through related variables

```ts
const res = getResonse()
const isSuccessResponse = res instanceof SuccessResponse

if (isSuccessResponse) {
  res.data // SuccessResponse
}
```

### Re-assignment updates types

```ts
let data: number | string
data // number | string
data = 'hello'
data // string;
```
