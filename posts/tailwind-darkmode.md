---
title: 'DarkMode'
date: '2023-04-25'
tag: 'tailwind'
description: '(Next)Tailwindcss를 이용하여 간단하게 DarkMode 적용해보자'
---

## 1. 설치

### tailwind 설치

```
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 2. tailwind config 설정

`tailwind.config.js`에 `darkMode: 'class'` 추가

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  }
}
```

## 2. 최상위 컴포넌트에 적용

```jsx
export default function Layout(props: Props) {
  return (
    <main
      className={`flex flex-col h-full dark:h-full bg-white text-gray-800 dark:bg-black dark:text-white`}>
      {props.children}
    </main>
  )
}
```

`Layout`이라는 공통 컴포넌트에 적용

## 3. 다크모드 이벤트 처리

> `localStorage` 사용

```ts
// nav.tsx
const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'dark'
        ? 'dark'
        : 'light'
      : 'light'
)

// icon 클릭
const handleClick = () => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
}

// sideEffect
useEffect(() => {
    if (theme === 'dark') {
      (document.querySelector('body') as HTMLBodyElement).classList.add('dark')
    } else {
      (document.querySelector('body') as HTMLBodyElement).classList.remove(
        'dark'
      )
    }
}, [theme])

// condition
<button onClick={handleClick}>
  theme === 'light' ? (
    <Image
      className={`cursor-pointer hover:opacity-70`}
      width={30}
      height={40}
      src={moon}
      alt={moon}
      loading='lazy'
    />
  ) : (
    <Image
      className={`cursor-pointer hover:opacity-90`}
      width={30}
      height={40}
      src={sun}
      alt={sun}
      loading='lazy'
    />
  )}
</button>
```

[참고](https://tailwindcss.com/docs/dark-mode)
