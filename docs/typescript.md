# typeScript

## 一：安装

```shell
npm i typescript -g
```

运行**tsc -v** 查看，若出现**因为在此系统上禁止运行脚本**时，解决方法：

以管理员身份运行**windows power shell** ，输入命令 **set-ExecutionPolicy RemoteSigned**，输入**Y**即可解决

- **node**环境执行 ts

  ```shell
  npm i @types/node --save-dev
  npm i ts-node -g
  ```

## 二：基础类型

### 1：字符串类型

```typescript
let a: string = "hhhh"; // 普通声明
let str: string = `ddd${a}`; // 使用es6的字符串模板
```

### 2：数字类型

支持**十六进制**，**十进制**，**八进制**和**二进制**

```typescript
let notANumber: number = NaN; // NaN
let num: number = 123; // 普通数字
let infinityNumber: number = Infinity; // 无穷大
let decimal: number = 6; // 十进制
let hex: number = 0xf00d; // 十六进制
let binary: number = 0b1010; // 二进制
let octal: number = 0o744; // 八进制
```

### 3：布尔类型

```typescript
let booleand: boolean = true; // 直接使用布尔值
let booleand2: boolean = Boolean(1); // 通过函数返回布尔值
```

注：

使用构造函数**Boolean**创造的对象不是布尔值

```typescript
let createBoolean: boolean = new Boolean(1); // 报错
```

**new Boolean()**返回的是一个**Boolean**对象

```typescript
let createBoolean: Boolean = new Boolean(1);
```

### 4：空值类型

javascrtipt 没有**空值（void）**的概念，在 TypeScript 中，可以用**void**表示没有任何返回值的函数

```typescript
function voidFn(): void {
  console.log("test");
}
```

void 类型的用法，主要是用在我们不希望调用者关心函数返回值的情况下，比如通常的**异步回调函数**。

**void**也可以定义**undefined**和**null**类型

```typescript
let u: void = undefined;
let n: void = null;
```

**注：如果 tsconfig.json 开启了严格模式**

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

**null 不能赋予 void 类型**

### 5：Null 和 undefined 类型

```typescript
let u: undefined = undefined;
let n: null = null;
```

viod 和 undefined 和 null 最大的区别

与 void 的区别是，undefined 和 null 是所有类型的子类型。换句话说，在**非严格模式下**，undefined 类型的变量可以赋值给 string 类型的变量

```typescript
let test: null = null;
let num2: string = "1";
num2 = test;

let test1: undefined = undefined;
let num3: string = "222";
num3 = test1;
```

## 三：顶级类型

### 1：any 和 unknown 类型

- 没有强制限定哪种类型，随时切换类型都可以，我们可以对 any 进行任何操作，不需要检查类型

  ```typescript
  let any1: any = 123;
  any1 = "123";
  any1 = true;
  ```

- 声明变量的时候没有指定任意类型，默认为 any

  ```typescript
  let anys;
  anys = "123";
  anys = true;
  ```

- TypeScript 3.0 中引入的 unknown 类型比 any 更加严格，更安全

  ```typescript
  let value: unknown;
  value = true;
  value = "str";
  value = Symbol("type");
  ```

### 2：any 和 unknown 的区别

- **unknown**类型不能作为子类型，只能作为**父类型**，**any**可以作为**父类型和子类型**

  ```typescript
  let name1: unknown = "111";
  let name2: string = name1; // 报错

  let name1: any = "111";
  let name2: string = name1; // 不报错
  ```

- **unkonwn**可赋值对象只有**unknown**和**any**

  ```typescript
  let bbb: unknown = "123";
  let aaa: any = "456";
  aaa = bbb;
  ```

- **any**类型在对象没有这个属性的时候获取不会报错，如果是**unknown**，是不能调用属性和方法

  ```typescript
  let obj: any = { b: 1 };
  obj.a; // 不报错

  let obj1: unknown = { b: 1, vv: (): number => 211 };
  obj1.b; // 报错
  obj1.vv; // 报错
  ```

## 四：接口和对象类型

### 1：接口类型

在 typeScript 中，定义对象的方式要用关键字 interface(接口)，可以理解为一种约束，让数据的结构满足约束的格式。

```typescript
// 使用接口约束的时候不能多一个属性，也不能少一个属性，必须与接口保持一致
interface Person {
  a: string;
  b: string;
}
const p1: Person = {
  a: "1",
  b: "2",
};
```

**重名 interface 可以合并，可以继承**

```typescript
// 重名合并
interface A {
  name: string;
}
interface A {
  age: number;
}
const a: A = {
  name: "sss",
  age: 11,
};
// 继承
interface A {
  name: string;
}
interface B extends A {
  age: number;
}
const b: B = {
  name: "ss",
  age: 11,
};
```

**可选属性使用？操作符**

```typescript
// 可选属性的含义是该属性可以不存在
interface Person {
  age?: number;
  name: string;
}
const p: Person = {
  name: "ee",
};
```

**任意属性[propName: string]**

如果一旦定义了任意属性，那么**确定属性**和**可选属性**的类型都必须是它的类型的**子集**

```typescript
// 允许添加新的任意属性
interface Person {
  age?: number;
  name: string;
  [propName: string]: any;
}
const p: Person = {
  name: "ee",
  a: "33",
};
```

**只读属性 readonly**

readonly 只读属性是不允许被赋值的，**只能读取**

```typescript
interface Person {
  a: number;
  readonly b: string;
}
const p: Person = {
  a: 11,
  b: "eee",
};
p.a = 334;
p.b = "333"; // 报错
```

**添加函数**

```typescript
interface Person {
  a: number;
  readonly b: string;
  cb: () => void;
}
const p: Person = {
  a: 11,
  b: "eee",
  cb: () => {
    console.log("11");
  },
};
```

## 五： 数组类型

### 1：类型[]

```typescript
const arr1: number[] = [1, 2, 3, 4];
const arr2: number[] = [1, 2, "r"]; // 报错，数字类型中不能出现字符串
arr2.unshift("1"); // 操作方法添加也不行
```

### 2：数组泛型

```typescript
const arr2: Array<number> = [1, 3, 4, 5];
```

### 3：用接口表示数组

一般用来描述类数组

```typescript
interface NumberArray {
  [index: number]: number;
}
const arr3: NumberArray = [1, 2, 3, 4]; // 表示： 只要索引的类型是数字，那么值的类型必须是数字
```

### 4：多维数组

```typescript
const data: number[][] = [
  [1, 2],
  [4, 5],
];
```

### 5：arguments 类数组

```typescript
function Arr(...args: any): void {
  console.log(arguments);
  // ts内置对象IArguments定义
  let arr: IArguments = arguments;
}
Arr(111, 222);
// IArguments是TypeScript中定义好的类型
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
```

## 六：函数扩展

### 1：函数类型

参数不能多传，也不能少传，必须按照约定的类型来

```typescript
const fn = (name: string, age: string): string => {
  return name + age;
};
fn("zs", "12");
```

### 2：函数的可选参数？

```typescript
const fn = (name: string, age?: string): string => {
  return name + age;
};
fn("zs");
```

### 3：函数参数的默认值

```typescript
const fn = (name: string = "hh", age?: string): string => {
  return name + age;
};
fn();
```

### 4：接口定义函数

```typescript
interface Add {
  (num: number, num2: number): number;
}
const fn: Add = (num: number, num2: number) => {
  return num + num2;
};
fn(1, 2);
```

### 5：定义剩余参数

```typescript
const fn = (array: number[], ...items: any[]): any[] => {
  return items;
};
const a: number[] = [1, 2, 4];
fn(a, "1", "4");
```

### 6：函数重载

函数重载是指方法名字相同，而**参数不同**，**返回类型可以相同也可以不同**；如果参数类型不同，则参数类型应设置为 any；参数数量不同，你可以将不同参数设置为可选。

```typescript
function fn(params: number): void {}
function fn(params: number, params1: string): void {}
function fn(params: any, params1?: any): void {}
```

## 七：联合类型

```typescript
const a: string | number = "111";
const fn = (x: number | boolean): boolean => {
  return !!x;
};
```

## 八：交叉类型

**多种类型的集合**，联合对象将具有所联合类型的所有成员

```typescript
interface People {
  age: number;
  height: number;
}
interface Man {
  sex: string;
}
const a = (man: People & Man) => {
  console.log("111");
};
```

## 九：类型断言

语法： **值 as 类型**； **<类型>值**

```typescript
interface A {
  run: string;
}
interface B {
  bulid: string;
}
const fn = (type: A | B): string => {
  return (type as A).run;
};
```

**类型断言**只能够欺骗 TypeScript 编译器，无法避免运行时的错误，滥用时可能会导致运行时错误

- **使用 any 临时断言**

  ```typescript
  (window as any).abc = 123;
  ```

- **as const**

  是对字面值的断言，与 const 直接定义常量是有区别的

  如果是**普通类型**，直接与 const 声明一致

  ```typescript
  const a = "hhh";
  a = "rrr"; // 无法修改

  let b = "hhh" as const;
  b = "rrr"; // 无法修改
  ```

  如果是**数组**

  ```typescript
  let a1 = [10, 20] as const;
  const a2 = [10, 20];

  a1.unshift(2); // 错误，此时已经断言为字面量[10,20],数据无法做任何修改
  a2.unshift(1); // 通过，没有修改指针
  ```

  **类型断言是不具影响力的，因为编译过程中会删除类型断言**
