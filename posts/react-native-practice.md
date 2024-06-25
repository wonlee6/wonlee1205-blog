---
title: 'React-Native 기본'
date: '2024-06-25'
tag: 'React-Native'
description: 'React Native 기본'
---

모바일을 공부하려고 React-Native와 flutter 둘 중 고민하다 Rn으로 결정 후,
부족하지만 조금 끄적여본다.

## Init

```
- npx create-expo-app --template
- expo init (project name)
```

만약 expo가 설치되어 있지 않았다면
```
sudo npm i -g expo-cli
```
> 참고: 실습당시 46버전
> [참고 링크](https://blog.expo.dev/the-new-expo-cli-f4250d8e3421)

IOS 시뮬 설치
[홈페이지](https://developer.apple.com/documentation/safari-developer-tools/adding-additional-simulators)

```
xcode - app store install
```

안드로이드는
[시뮬](https://developer.android.com/studio/?gclid=Cj0KCQiAjJOQBhCkARIsAEKMtO3zEhdK4_I0CEZic3UH4dl-9gVXuHFR9dCl3TOHKjmv3xWLU3UxfhYaApfAEALw_wcB&gclsrc=aw.ds&hl=ko)
여기서 설치

## Component

(대부분 리액트와 비슷하기에 공식홈페이지만 보고 기초적인 부분은 따라서도 가능하다.)
> 리액트 네이티브는 Dom 엘리먼트가 없기 때문에 하나의 

자주 사용하는 리액트 네이티브 컴포넌트들을 하나씩 알아보자. ~~아주 쉽게~~

1. View - div
2. Text - p
3. Button - button
```jsx
<Button title='Tab me!' onPress={() => setGoals([...goals, input])} />
```
4. InputText - input
```jsx
<TextInput 
	value={input}
	onChangeText={(e) => setInput(e)}
/>
```
- onChange={(e) => e.nativeEvent.text}
- onChangeText={(e) => e}
5. ScrollView - scroll container
```jsx
<ScrollView>
	{goals.map((i, index) => (
		<View key={index} style={styles.goalItem}>
			<Text style={styles.goalText }>
				{i}
			</Text>
		</View>
	))}
</ScrollView>
```
6. FlatList - 버츄어 리스트와 비슷
```jsx
<FlatList data={goals} renderItem={(item) => (
	<View style={styles.goalItem}>
		<Text style={styles.goalText }>
			{item.item.text}
		</Text>
	</View>
	)}
	keyExtractor={(item, index) => {
		return item.id
	}}
	alwaysBounceVertical={false}
/>
```
7. Pressable - 터치
```jsx
<Pressable
	android_ripple={{ color: "#210644" }}
	onPress={() => onDeleteGoals(id)}
	style={({ pressed }) => pressed && styles.pressedItem}
>
	<Text style={styles.goalText}>{text}</Text>
</Pressable>
```
8. Modal
9. Dimensions - 가로 세로 width
```js
const { width, height } = useWindowDimensions()
```
10. SafeAreaView - 영역 확보
11. ImageBackground
12. KeyboardAvoidingView - 키보드가 화면을 가리지 않기 위해

#### app.json에서 backgroundColor  설정 가능
이정도로 ? 생각하면 될거같다.

## Style

Rn에서 스타일을 변경하는 방법
- inline
- StyleSheet.create
- [nativewind](https://www.nativewind.dev/)
```
// in nativewind-env.d.ts

/// <reference types="nativewind/types" />
```
1) StyleSheet

```jsx
export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
```
하나의 컴포넌트는 독립적으로 실행
- 각각 스타일링 해줘야함

2. inline 스타일 변경
3. nativewind - tailwindcss처럼 작업하기 위한 라이브러리

## Font & Loading
- npx install expo-font expo-app-loading
- asset > fonts
```jsx
// in component
import { useFonts } from 'expo-font'

const [loaded, error] = useFonts({
  SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  ...FontAwesome.font
})
```

## 기타

[지도](https://github.com/react-native-maps/react-native-maps)

[네비게이션](https://reactnavigation.org/docs/getting-started/)

[아이콘](https://icons.expo.fyi/Index)
