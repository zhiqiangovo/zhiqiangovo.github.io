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
