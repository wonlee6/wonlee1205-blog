---
title: 'Socket 사용하여 간단한 채팅 구현'
date: '2024-07-20'
tag: 'Etc'
description: 'Socket.io 이용하여 간단한 채팅 구현해보기'
---

# Socket

Socket.IO는 웹 애플리케이션에서 실시간 양방향 통신을 구현하기 위해 사용되는 JavaScript 라이브러리입니다. 클라이언트와 서버 간의 원활한 연결을 제공하며, WebSockets와 다른 기술을 사용하여 브라우저와 서버 간의 실시간 데이터를 효율적으로 교환할 수 있습니다.

> 테스트 환경 - Bun js(npm 도 상관없습니다.)

## 설치

```
bun i socket.io socket.io-client vite-express express
```

## Server

1. Express 서버 설정

```js
import express from 'express'
import ViteExpress from 'vite-express'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)
```

- Express 프레임워크를 사용하여 기본 웹 서버를 설정합니다.
- http.createServer를 사용하여 Express 애플리케이션을 기반으로 HTTP 서버를 생성합니다.
- Socket.IO 서버를 HTTP 서버에 연결하기 위해 Server 객체를 사용합니다.

2. Socket.IO 서버 설정

> 모든 도메인에서의 연결을 허용하는 CORS 설정을 추가

```js
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})
```

3. Socket.IO 이벤트 처리

```js
// 클라이언트가 웹소켓 연결을 할 때 발생하는 이벤트
io.on('connection', (socket) => {
  const username = socket.handshake.query.username
  console.log(`${username} 입장`)

  // 자신을 제외, 연결된 모든 클라이언트에게 메시지를 전송
  socket.broadcast.emit('message', {user: 'system', text: `${username}님이 입장하였습니다.`})

  // 클라이언트로부터 메시지를 수신하면, 모든 클라이언트에게 전송
  socket.on('message', (data) => {
    console.log('Message received: ', data)
    io.emit('message', {user: username, text: data})
  })

  // 클라이언트가 연결을 끊을 때 발생하는 이벤트
  socket.on('disconnect', () => {
    console.log('Client disconnected')
    io.emit('message', {user: 'system', text: `${username}님이 나갔습니다.`})
  })

  // 오류가 발생할 때 처리하는 이벤트
  socket.on('error', (error) => {
    console.error(error)
  })
})
```

4. 서버 시작

> HTTP 서버가 포트 3000에서 요청을 듣도록 설정

```js
server.listen(3000, () => {
  console.log('Server is listening...')
})
```

6. Vite와 Express 통합

```js
ViteExpress.bind(app, server)
```

### full code

```js
import express from 'express'
import ViteExpress from 'vite-express'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  const username = socket.handshake.query.username
  console.log(`${username} 입장`)

  socket.broadcast.emit('message', {user: 'system', text: `${username}님이 입장하였습니다.`})

  socket.on('message', (data) => {
    console.log('Message received: ', data)
    io.emit('message', {user: username, text: data})
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    io.emit('message', {user: 'system', text: `${username}님이 나갔습니다.`})
  })

  socket.on('error', (error) => {
    console.error(error)
  })
})

server.listen(3000, () => {
  console.log('Server is listening...')
})

ViteExpress.bind(app, server)
```

## Client

```jsx
import {useCallback, useEffect, useState} from "react";
import io, {type Socket} from "socket.io-client";

export default function WebSocketCompo() {
    // socket 담을 State 선언
    const [socket, setSocket] = useState<Socket | null>(null);
    // 채팅 룸에 접속할 이름
    const [userName, setUserName] = useState("");
    // 채팅 메세지 State
    const [chat, setChat] = useState<{user: string; text: string}[]>([]);
    // 채팅 접속 버튼 이벤트
    const handleConnect = useCallback(() => {
        // io 인스턴스 생성 후
        const ioInstance = io("http://localhost:3000", {
            autoConnect: false,
            query: {
                username: userName // 닉네임
            }
        });
        // 서버와 연결
        ioInstance.connect();
        setSocket(ioInstance);

        const text = `${userName}님이 입장하였습니다.`;
        // 서버에 메세지 전송
        ioInstance.emit(text);
        // 채팅 메세지를 담을 State
        setChat((prevChat) => [...prevChat, {user: userName, text}]);
    }, [userName]);

     useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => setIsConnected(true));
    }, [socket]);

    return (
        ...
            <h1>{isConnected ? "접속중" : "접속종료"}</h1>

            <InputText value={userName} onChange={(e) => setUserName(e.target.value)} />
            <div style={{display: "flex", gap: "1rem"}}>
                <Button label="connect" onClick={handleConnect} />
                <Button label="disconnect" onClick={handleDisconnect} />
            </div>
        ...
    )
}
```

### client

![img](https://i.ibb.co/P1Qcxwt/2024-07-20-4-32-43.png)

### server

![img](https://i.ibb.co/wgjpVQm/2024-07-20-4-35-40.png)

접속 버튼을 누르게 되면 위와 같이 확인할 수 있습니다.

> 채팅방 구현

```jsx
    // 연결해제 이벤트
    const handleDisconnect = useCallback(() => {
        if (socket) {
            socket.disconnect();
            console.log("소켓 연결 해제");
            setIsConnected(false);
        }
    }, [socket]);
    // 채팅 메세지 전송 이벤트
    const hanldeMsgSubmit = () => {
        if (message && socket) {
            socket.emit("message", message);
            setMessage("");
        }
    };

    // 서버로부터 전달받은 메세지를 담는 이벤트
    const handleMessage = (message: {user: string; text: string}) => {
        setChat((prevChat) => [...prevChat, message]);
    };

    // socket 소켓 이벤트 처리
    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => setIsConnected(true));
        socket.on("disconnect", () => setIsConnected(false));
        socket.on("message", handleMessage);
        return () => {
            socket?.off("connect", handleConnect);
            socket?.off("disconnect", handleDisconnect);
            socket?.off("message", handleMessage);
        };
    }, [handleConnect, handleDisconnect, socket]);

    return (
        ...
    )
```

![img](https://i.ibb.co/PmJpbpv/2024-07-20-4-45-45.png)

### 마무리

서로 다른 브라우저 탭에서 접속한 후, 메세지를 보내는 것까지 만들어봤습니다.

워낙 간단하게 구현한거라 실무에서는 적용하기 어렵고 소켓을 통해 클라이언트와 서버가 어떻게 통신하는지에 대해서 조금이나마 알게 된거 같습니다.
