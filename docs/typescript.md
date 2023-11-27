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

## 十：内置对象

### 1：ECMAScript 的内置对象

**Boolean，Number，String，RegExp，Date，Error**

```typescript
let b: Boolean = new Boolean(1);
let n: Number = new Number(true);
let s: String = new String("hello");
let d: Date = new Date();
let r: RegExp = /^1/;
let e: Error = new Error("error");
```

### 2：DOM 和 BOM 的内置对象

**Document，HTMLElement，Event，NodeList**

```typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll("div");
// 读取div时需要类型断言，或者加个判断应为都不到返回null
let div: HTMLElement = document.querySelector("div") as HTMLDivElement;
```

**dom 元素映射表**

```typescript
interface HTMLElementTagNameMap {
  a: HTMLAnchorElement;
  abbr: HTMLElement;
  address: HTMLElement;
  applet: HTMLAppletElement;
  area: HTMLAreaElement;
  article: HTMLElement;
  aside: HTMLElement;
  audio: HTMLAudioElement;
  b: HTMLElement;
  base: HTMLBaseElement;
  bdi: HTMLElement;
  bdo: HTMLElement;
  blockquote: HTMLQuoteElement;
  body: HTMLBodyElement;
  br: HTMLBRElement;
  button: HTMLButtonElement;
  canvas: HTMLCanvasElement;
  caption: HTMLTableCaptionElement;
  cite: HTMLElement;
  code: HTMLElement;
  col: HTMLTableColElement;
  colgroup: HTMLTableColElement;
  data: HTMLDataElement;
  datalist: HTMLDataListElement;
  dd: HTMLElement;
  del: HTMLModElement;
  details: HTMLDetailsElement;
  dfn: HTMLElement;
  dialog: HTMLDialogElement;
  dir: HTMLDirectoryElement;
  div: HTMLDivElement;
  dl: HTMLDListElement;
  dt: HTMLElement;
  em: HTMLElement;
  embed: HTMLEmbedElement;
  fieldset: HTMLFieldSetElement;
  figcaption: HTMLElement;
  figure: HTMLElement;
  font: HTMLFontElement;
  footer: HTMLElement;
  form: HTMLFormElement;
  frame: HTMLFrameElement;
  frameset: HTMLFrameSetElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  head: HTMLHeadElement;
  header: HTMLElement;
  hgroup: HTMLElement;
  hr: HTMLHRElement;
  html: HTMLHtmlElement;
  i: HTMLElement;
  iframe: HTMLIFrameElement;
  img: HTMLImageElement;
  input: HTMLInputElement;
  ins: HTMLModElement;
  kbd: HTMLElement;
  label: HTMLLabelElement;
  legend: HTMLLegendElement;
  li: HTMLLIElement;
  link: HTMLLinkElement;
  main: HTMLElement;
  map: HTMLMapElement;
  mark: HTMLElement;
  marquee: HTMLMarqueeElement;
  menu: HTMLMenuElement;
  meta: HTMLMetaElement;
  meter: HTMLMeterElement;
  nav: HTMLElement;
  noscript: HTMLElement;
  object: HTMLObjectElement;
  ol: HTMLOListElement;
  optgroup: HTMLOptGroupElement;
  option: HTMLOptionElement;
  output: HTMLOutputElement;
  p: HTMLParagraphElement;
  param: HTMLParamElement;
  picture: HTMLPictureElement;
  pre: HTMLPreElement;
  progress: HTMLProgressElement;
  q: HTMLQuoteElement;
  rp: HTMLElement;
  rt: HTMLElement;
  ruby: HTMLElement;
  s: HTMLElement;
  samp: HTMLElement;
  script: HTMLScriptElement;
  section: HTMLElement;
  select: HTMLSelectElement;
  slot: HTMLSlotElement;
  small: HTMLElement;
  source: HTMLSourceElement;
  span: HTMLSpanElement;
  strong: HTMLElement;
  style: HTMLStyleElement;
  sub: HTMLElement;
  summary: HTMLElement;
  sup: HTMLElement;
  table: HTMLTableElement;
  tbody: HTMLTableSectionElement;
  td: HTMLTableDataCellElement;
  template: HTMLTemplateElement;
  textarea: HTMLTextAreaElement;
  tfoot: HTMLTableSectionElement;
  th: HTMLTableHeaderCellElement;
  thead: HTMLTableSectionElement;
  time: HTMLTimeElement;
  title: HTMLTitleElement;
  tr: HTMLTableRowElement;
  track: HTMLTrackElement;
  u: HTMLElement;
  ul: HTMLUListElement;
  var: HTMLElement;
  video: HTMLVideoElement;
  wbr: HTMLElement;
}
```

### 3：定义 Promise

如果我们不指定返回的类型，TS 是推断不出来返回的是什么类型

```typescript
function promise(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    resolve(1);
  });
}
promise().then((res) => {
  console.log(res);
});
```

当我们在使用一些常用的方法的时候，TS 实际上已经帮我们做了很多类型推断的工作了，而他们定义的文件，则在**TS 核心库**的定义文件中

## 十一：Class

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。基本上，ES6 的 class 可以看做只是一个**语法糖**，它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让**对象的原型的写法更加清晰**，更加**面向对象编程**的语法而已。

### 1：定义类

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  run() {}
}
```

### 2：类的修饰符

**public，private，protected**

```typescript
class Person {
  public name: string;
  private age: number;
  protected some: any;
  constructor(name: string, age: number, some: any) {
    this.name = name;
    this.age = age;
    this.some = some;
  }
  run() {}
}
```

**public**修饰符：定义的变量**内部访问**，**也可以外部访问**

**private**修饰符：定义的变量私有，只能在**内部访问**，**不能在外部访问**

**protected**修饰符：定义的变量私有，只能在**内部和继承的子类**中访问，**不能在外部访问**

### 3：静态属性和静态方法

```typescript
class Person {
  static nb: string;
  constructor() {}
  static run() {
    this.aaa();
  }
  static aaa() {}
}
Person.nb;
```

我们用 static 定义的**属性**，不可以通过 this 去访问，只能通过**类名去调用**；static 静态**函数**，同样也是不能通过 this 去调用，也是通过**类名去调用**

注：**如果两个函数都是 static 静态的是可以通过 this 互相调用**

### 4：interface 定义 类

```typescript
interface PersonClass {
  get(type: boolean): boolean;
}
interface PersonClass2 {
  set(): void;
  asd: string;
}
class A {
  name: string;
  constructor() {
    this.name = "123";
  }
}
class Person extends A implements PersonClass, PersonClass2 {
  asd: string;
  constructor() {
    super();
    this.asd = "123";
  }
  get(type: boolean): boolean {
    return type;
  }
  set(): void {}
}
```

### 5：抽象类

应用场景：如果你写的类实例化之后毫无用处，此时我们可以把他定义为抽象类，或者，你也可以把他作为一个**基类->通过继承一个派生类去实现基类的一些方法**

```typescript
abstract class ABC {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  print(): string {
    return this.name;
  }
  abstract getName(): string;
}

class BBB extends ABC {
  constructor() {
    super("xx");
  }
  getName(): string {
    return this.name;
  }
}
let b = new BBB();
```

我们在 ABC 类中定义了 getName 抽象方法但未实现，我们 BBB 类实现了 ABC 定义的抽象方法，如不实现就不报错，**我们定义的抽象方法必须在派生类实现**

## 十二：元组类型

如果需要一个**固定大小的不同类型值**的集合，我们需要使用元组

**元组**就是数组的变种，元组是固定数量的不同类型的元素的组合。元组与集合的不同之处在于，元组中的**元素类型可以是不同**的，而且**数量固定**。元组的好处在于可以把多个元素作为一个单元传递。如果一个方法需要返回多个值，可以把这多个值作为元组返回，而不需要创建额外的类来表示。

```typescript
const arr: [number, string] = [1, "2"];
// 可以支持访问
arr[1].length;
```

元组类型还可以支持**自定义名称**和变为**可选**的

```typescript
const arr1: [x: number, y?: string] = [1];
```

对于**越界元素**

```typescript
const arr: [number, string] = [1, "2"];
arr.push(true); // 报错  （number | string）
```

此时，它的类型被限制为联合类型

**应用场景**：定义 excel 返回的数据

```typescript
let excel: [string, number, string][] = [
  ["title", 1, "hh"],
  ["title", 2, "hh"],
];
```

## 十三：枚举类型

### 1：数字枚举

```typescript
enum Types {
  Red,
  Blue,
  Yellow,
}
// 分别代表 红色0，蓝色1，黄色2
```

- 增长枚举

  ```typescript
  enum Types {
    Red = 2,
    Blue,
    Yellow,
  }
  // 成员会从2自动增长
  // 分别代表 红色2，蓝色3，黄色4
  ```

### 2：字符串枚举

在字符串枚举里，每个成员都必须用**字符串字面量**，或另外一个字符串枚举成员进行**初始化**

```typescript
enum Types {
  Red = "red",
  Blue = "blue",
  Yellow = "yellow",
}
```

由于字符串没有自增长的行为，字符串枚举可以很好的**序列化**。字符串枚举允许你提供一个运行时有意义并且可读的值，独立于枚举成员的名字。

### 3：异构枚举

```typescript
enum Types {
  No = "No",
  Yes = 1,
}
```

### 4：接口枚举

```typescript
enum Types {
  yyds,
  dddd,
}
interface A {
  red: Types.yyds;
}
// 声明对象时也要遵循这个规则
let obj: A = {
  red: Types.yyds,
};
```

### 5：const 枚举

let 和 var 都是不允许的声明，只能使用**const**。

大多数情况下，枚举是十分有效的方案。然而在某些情况下很严格，为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 const 枚举。**常量枚举**通过在枚举上使用 const 修饰符来定义。

**const 声明**的枚举会被编译成常量

```typescript
const enum Types {
  No = "No",
  Yes = 1,
}
console.log(Types.No);
console.log(Types.Yes);
```

编译后

```typescript
console.log("No" /* Types.No */);
console.log(1 /* Types.Yes */);
```

**普通声明**的枚举编译完后是个对象

```typescript
enum Types {
  No = "No",
  Yes = 1,
}
console.log(Types.No);
console.log(Types.Yes);
```

编译后

```typescript
var Types;
(function (Types) {
  Types["No"] = "No";
  Types[(Types["Yes"] = 1)] = "Yes";
})(Types || (Types = {}));
console.log(Types.No);
console.log(Types.Yes);
```

### 6：反向映射

包含**正向映射（name-->value）**和**反向映射（value-->name）**

```typescript
enum Types {
  fall,
}
let a = Types.fall;
console.log(a); // 0
let nameOa = Types[a];
console.log(nameOa); // fall
```

## 十四：类型推论|类型别名

### 1：类型推论

TS 会在没有明确指定类型的时候推测出一个类型，这就是**类型推论**

```typescript
let str = "rrrrr"; // 推断出为string
```

如果你声明的变量没有定义类型也没有赋值，此时就会推断为**any**，进行任意操作

```typescript
let str; // 推断为any类型
```

### 2：类型别名

**type**关键字（可以给一个类型定义一个名字）多用于复合类型

```typescript
type str = string;
let a: str = "@@";

// 定义函数别名
type hh = () => string;
const b: hh = () => "sss";

// 定义联合类型别名
type c = string | number;
const f = "eee";

// 定义值的别名
type value = boolean | "0" | 123;
const d: value = "0";
```

**interface 和 type 的区别**

1. interface 可以继承，type 只能通过&交叉类型合并
2. type 可以定义联合类型和可以使用一些操作符，interface 不行
3. interface 遇到重名的会合并，type 不行

## 十五：never 类型

TS 将使用**never**类型来表示不应该存在的状态

```typescript
// 返回never的函数必须存在无法达到的终点
// 因为必定抛出异常，所以error将不会有返回值
function error(message: string): never {
  throw new Error(message);
}
// 因为存在死循环，所以loop将不会有返回值
function loop(): never {
  while (true) {}
}
```

**never 和 void 的差异**

```typescript
// void类型只是没有返回值，但本身不会出错
function Void(): void {
  console.log();
}
// 只会抛出异常没有返回值
function Never(): never {
  throw new Error("aaa");
}
```

```typescript
type A = void | number | never;
// 只显示void和number，never在联合类型中会被移除
```

**应用场景：**

```typescript
type A = "A" | "B" | "C";
function isAA(value: A) {
  switch (value) {
    case "A":
      break;
    case "B":
      break;
    case "C":
      break;
    default:
      // 用于场景兜底逻辑
      const error: never = value;
      return error;
  }
}
```

## 十六：symbol 类型

### 1：创建

symbol 类型的值是通过**Symbol**函数调用创建的，可以传递参数作为唯一标识，只支持**string**和**number**类型的参数。

```typescript
const s1 = Symbol();
const s2 = Symbol("key");
```

symbol 值是**唯一**的

```typescript
const s1 = Symbol();
const s2 = Symbol();
// s1 === s2 false
```

### 2：用作对象的键

```typescript
const s1 = Symbol();
let obj = {
  [s1]: "value",
};
console.log(obj[s1]);
```

### 3：不能通过如下方式遍历到

```typescript
const s1 = Symbol("666");
const s2 = Symbol("777");
let obj = {
  [s1]: "value",
  [s2]: "kkk",
  age: 19,
  sex: "女",
};
// 1：for in 遍历不到symbol类型
for (const key in obj) {
  console.log(key); // age,sex
}
// 2: Object.keys(obj)
console.log(Object.keys(obj)); // [ 'age', 'sex' ]
// 3: Object.getOwnPropertyNames(obj)
console.log(Object.getOwnPropertyNames(obj)); // [ 'age', 'sex' ]
// 4: JSON.stringify(obj)
console.log(JSON.stringify(obj)); // {"age":19,"sex":"女"}
```

如何拿到

```typescript
// 1: Object.getOwnPropertySymbols(obj)
console.log(Object.getOwnPropertySymbols(obj)); //  [ Symbol(666), Symbol(777) ]
// 2: Reflect.ownKeys(obj)
console.log(Reflect.ownKeys(obj)); // [ 'age', 'sex', Symbol(666), Symbol(777) ]
```

### 4：Symbol 迭代器和生成器 for of

```typescript
const arr = [1, 2, 3];
let iterator: any = arr[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

**for ... of** 其实就是迭代器的语法糖，for ... of 不能循环没有 iterator 的对象

**数组解构**的原理也是调用迭代器

### 5：API 列表

**Symbol.hasInstance**：方法，会被 instanceof 运算符调用。构造器对象用来识别一个对象是否是其实例。

**Symbol.isConcatSpreadable**：布尔值，表示当在一个对象上调用 Array.prototype.concat 时，这个对象的数组元素是否可展开。

**Symbol.iterator**：方法，被 for-of 语句调用。返回对象的默认迭代器。

**Symbol.match**：方法，被 String.prototype.match 调用。正则表达式用来匹配字符串。

**Symbol.replace**：方法，被 String.prototype.replace 调用。正则表达式用来替换字符串中匹配的子串。

**Symbol.search**：方法，被 String.prototype.search 调用。正则表达式返回被匹配部分在字符串中的索引。

**Symbol.species**：函数值，为一个构造函数。用来创建派生对象。

**Symbol.split**：方法，被 String.prototype.split 调用。正则表达式来用分割字符串。

**Symbol.toPrimitive**：方法，被 ToPrimitive 抽象操作调用。把对象转换为相应的原始值。

**Symbol.toStringTag**：方法，被内置方法 Object.prototype.toString 调用。返回创建对象时默认的字符串描述。

**Symbol.unscopables**：对象，它自己拥有的属性会被 with 作用域排除在外。

## 十七：泛型

### 1：创建

可以理解为**动态类型**

```typescript
function add<T>(a: T, b: T): Array<T> {
  return [a, b];
}
```

```typescript
function add<T, U>(a: T, b: U): Array<T | U> {
  const params: Array<T | U> = [a, b];
  return params;
}
```

### 2：定义泛型接口

```typescript
interface MyInter<T> {
  (arg: T): T;
}
function fn<T>(arg: T): T {
  return arg;
}
let result: MyInter<number> = fn;
result(123);
```

### 3：对象字面量泛型

```typescript
let foo: {
  <T>(arg: T): T;
};
foo = function <T>(arg: T): T {
  return arg;
};
foo(112);
```

### 4：泛型约束

约束其具有 length 的属性

```typescript
interface len {
  length: number;
}
function getLength<T extends len>(arg: T) {
  return arg.length;
}
getLength<string>("123");
```

### 5：使用 keyof 约束对象

使用**TS 泛型**和**泛型约束**。首先定义了 T 类型并使用关键字继承 obj 类型的子类型，然后使用 keyof 操作符获取 T 类型的所有键，它的返回类型是联合类型，最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型。

```typescript
function prop<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let o = { a: 1, b: 2, c: 3 };
prop(o, "a");
prop(o, "d"); // 报错发现找不到
```

### 6：泛型类

```typescript
class Sub<T> {
  attr: T[] = [];
  add(a: T): T[] {
    return [a];
  }
}

let s = new Sub<number>();
s.attr = [1, 2, 3];
s.add(123);
```

## 十八：tsconfig.json 配置

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}

// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

## 十九：命名空间

TS 提供命名空间**避免全局变量造成的污染**。

- 内部模块，主要用于**组织代码**，避免冲突。
- 命名空间内的类**默认私有**
- 通过**export**暴露
- 通过**namespace**关键字定义

### 1：定义

```typescript
namespace a {
  export const Time: number = 100;
  export const fn = <T>(arg: T): T => {
    return arg;
  };
  fn(Time);
}
namespace b {
  export const Time: number = 1000;
  export const fn = <T>(arg: T): T => {
    return arg;
  };
  fn(Time);
}
console.log(a.Time); // 100
```

### 2：嵌套的命名空间

```typescript
namespace b {
  export namespace n {
    export class Vue {
      parameters: string;
      constructor(parameters: string) {
        this.parameters = parameters;
      }
    }
  }
}
let v = b.n.Vue;
new v("1");
```

### 3：抽离命名空间

a.ts

```typescript
export namespace v {
  export const a = 1;
}
```

b.ts

```typescript
import { v } from "./a";
console.log(v);
```

### 4：简化命名空间

```typescript
namespace A {
  export namespace B {
    export const C = 1;
  }
}

import X = A.B.C;
console.log(X);
```

### 5：重名的命名空间会合并

```typescript
namespace a {
  export const b = 234;
}
namespace a {
  export const c = 22;
}
a.c;
a.b;
```

## 二十：Mixins 混入

### 1：对象的混入

使用 Object.assign 合并多个对象

```typescript
interface Name {
  name: string;
}
interface Age {
  age: number;
}
interface Sex {
  sex: number;
}
let people1: Name = { name: "hhhh" };
let people2: Age = { age: 10 };
let people3: Sex = { sex: 1 };

const people = Object.assign(people1, people2, people3);
// 此时people会推推断为一个交叉类型 Name & Age & Sex
```

### 2：类的混入

```typescript
class A {
  type: boolean = false;
  changeType() {
    this.type = !this.type;
  }
}

class B {
  name: string = "zs";
  getName(): string {
    return this.name;
  }
}
class C implements A, B {
  type: boolean;
  changeType(): void {}
  name: string;
  getName(): string {}
}
```
