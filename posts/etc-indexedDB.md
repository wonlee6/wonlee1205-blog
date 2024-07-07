---
title: 'IndexedDB 사용해보기'
date: '2024-07-07'
tag: 'etc'
description: 'IndexedDB 활용 방법'
---

# IndexedDB

#### IndexedDB는 웹 브라우저에서 사용 가능한 비관계형(NoSQL) 데이터베이스입니다. 클라이언트 측에서 대용량 데이터를 영구적으로 저장하고, 검색할 수 있도록 설계되었습니다. IndexedDB는 키-값 쌍으로 데이터를 저장하며, 트랜잭션을 지원하여 일관된 데이터 관리를 보장합니다.

## 예제 코드

### 연결 함수

```ts
export interface Item {
  id?: number
  name: string
}

// db.ts
export const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    // indexedDB 연결
    const request = indexedDB.open('my-database', 1)

    // 처음 생성하거나 데이터베이스의 스키마(구조)를 변경할 때
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains('items')) {
        // autoIncrement: 자동으로 키가 증가되어 셋팅된다. 1 > 2 > 3 ...
        db.createObjectStore('items', {keyPath: 'id', autoIncrement: true})
      }
    }
    // 연결 성공
    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result)
    }
    // 연결 실패
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error)
    }
  })
}
```

indexedDB 함수는 비동기적으로 작동하기에 외부에서 함수를 호출 할 때 편하게 `Promise`를 이용한다.

`my-database`, `items`은 각각 데이터베이스 이름, 저장소라고 생각하면 됩니다.  
즉, my-database > items 구조입니다.

![임지](https://i.ibb.co/fv8tTfc/2024-07-07-11-40-41.png)

### 추가 함수

```ts
// ...
export const addItem = async (item: Item): Promise<void> => {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    // 트랜잭션 생성 (읽기/쓰기 모드)
    const transaction = db.transaction('items', 'readwrite') // readonly, readwrite
    // 객체 저장소 접근
    const store = transaction.objectStore('items')
    // 데이터 추가
    const request = store.add(item)

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}
```

값을 추가하게 되면

![ㅁㄴㅇ](https://i.ibb.co/y563PY3/2024-07-07-11-32-25.png)

이렇게 key, value 형식으로 값을 저장할 수 있습니다.

### 값 가져오기

```ts
export const getAllItems = async (): Promise<Item[]> => {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('items', 'readonly')
    const store = transaction.objectStore('items')
    const request = store.getAll()

    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result as Item[])
    }

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}
```

`store.getAll()` 통해 store에 저장되어 있는 값들을 전부 가져올 수 있습니다.

### 리액트 컴포넌트에 적용하기

```jsx
function App() {
    const [items, setItems] = useState<Item[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            const allItems = await getAllItems();
            setItems(allItems);
        };

        fetchItems();
    }, []);

    const handleAddItem = async () => {
        await addItem({name: inputValue});
        const allItems = await getAllItems();
        setItems(allItems);
        setInputValue("");
    };

    return (
        <div>
            <h1>IndexedDB with React</h1>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={handleAddItem}>Add Item</button>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

테스트를 해보시면 새로고침 후, IndexedDB에 저장되어 있는 값을 가져오는 것을 확인 할 수 있습니다.

### 번외

`crypto-js` 라이브러리를 이용하여 암호화, 복호화를 하여 키를 저장

```
npm install crypto-js uuid
```

```ts
import CryptoJS from 'crypto-js'

// uuid 통해 만든 키
const secretKey = 'f60ef0e0-cf85-414e-a094-c1bb3e4bc947'

const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString()
}

const decryptData = (data: string): string => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// 위 openDatabase 함수 내 autoIncrement 제거
// ...
export const addItem = async (item: Omit<Item, 'id'>): Promise<void> => {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('items', 'readwrite')
    const store = transaction.objectStore('items')
    const id = CryptoJS.lib.WordArray.random(16).toString() // 랜덤한 ID 생성
    const encryptedName = encryptData(item.name)
    const request = store.add({id, name: encryptedName})

    request.onsuccess = () => {
      resolve()
    }

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}

export const getAllItems = async (): Promise<Item[]> => {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('items', 'readonly')
    const store = transaction.objectStore('items')
    const request = store.getAll()

    request.onsuccess = (event) => {
      const encryptedItems = (event.target as IDBRequest).result as Item[]
      const decryptedItems = encryptedItems.map((item) => ({
        id: item.id,
        name: decryptData(item.name)
      }))

      resolve(decryptedItems)
    }

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error)
    }
  })
}
```

![image](https://i.ibb.co/YRv3g3P/2024-07-08-12-05-38.png)

위 사진처럼 암호화 되어 값이 저장되는 것을 확인할 수 있습니다.

참고로 하나의 Row만 사용할려면

```ts
const hasData = store.get(key)
if (hasData) {
  const request = store.put({id, name: encryptedName})
} else {
  const request = store.add({id, name: encryptedName})
}
```

이런식으로도 가능합니다.
