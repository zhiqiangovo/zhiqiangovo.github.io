# typeScript

## 一：安装

```shell
npm i typescript -g
```

 运行**tsc -v** 查看，若出现**因为在此系统上禁止运行脚本**时，解决方法：

以管理员身份运行**windows power shell** ，输入命令 **set-ExecutionPolicy RemoteSigned**，输入**Y**即可解决

- **node**环境执行ts

  ```shell
  npm i @types/node --save-dev
  npm i ts-node -g
  ```

## 二：基础类型

### 1：字符串类型

```typescript
let a: string = 'hhhh'  // 普通声明
let str: string = `ddd${a}` // 使用es6的字符串模板
```

### 2：数字类型

支持**十六进制**，**十进制**，**八进制**和**二进制**

```typescript
let notANumber: number = NaN;  // NaN
let num: number = 123;  // 普通数字
let infinityNumber: number = Infinity; // 无穷大
let decimal: number = 6;  // 十进制
let hex: number = 0xf00d;  // 十六进制
let binary: number = 0b1010; // 二进制
let octal: number = 0o744; // 八进制
```

### 3：布尔类型

```typescript
let booleand: boolean = true  // 直接使用布尔值
let booleand2: boolean = Boolean(1)  // 通过函数返回布尔值
```

注：

使用构造函数**Boolean**创造的对象不是布尔值

```typescript
let createBoolean: boolean = new Boolean(1) // 报错
```

**new  Boolean()**返回的是一个**Boolean**对象

```typescript
let createBoolean: Boolean = new Boolean(1)
```

### 4：空值类型

javascrtipt没有**空值（void）**的概念，在TypeScript中，可以用**void**表示没有任何返回值的函数

```typescript
function voidFn(): void {
    console.log('test')
}
```

void类型的用法，主要是用在我们不希望调用者关心函数返回值的情况下，比如通常的**异步回调函数**。

**void**也可以定义**undefined**和**null**类型

```typescript
let u: void = undefined;
let n: void = null;
```

**注：如果tsconfig.json开启了严格模式**

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

**null 不能赋予void类型**

### 5：Null和undefined类型

```typescript
let u: undefined = undefined;
let n: null = null;
```

viod和undefined和null最大的区别

与void的区别是，undefined和null是所有类型的子类型。换句话说，在**非严格模式下**，undefined类型的变量可以赋值给string类型的变量

```typescript
let test: null = null
let num2: string = '1'
num2 = test

let test1: undefined = undefined;
let num3: string = '222';
num3 = test1
```

## 三：顶级类型

### 1：any和unknown类型

- 没有强制限定哪种类型，随时切换类型都可以，我们可以对any进行任何操作，不需要检查类型

  ```typescript
  let any1: any = 123;
  any1 = '123';
  any1 = true;
  ```

- 声明变量的时候没有指定任意类型，默认为any

  ```typescript
  let anys;
  anys = '123';
  anys = true;
  ```

- TypeScript 3.0 中引入的unknown类型比any更加严格，更安全

  ```typescript
  let value: unknown;
  value = true;
  value = 'str';
  value = Symbol("type");
  ```

### 2：any和unknown的区别

- **unknown**类型不能作为子类型，只能作为**父类型**，**any**可以作为**父类型和子类型**

  ```typescript
  let name1: unknown = '111';
  let name2: string = name1   // 报错
  
  let name1: any = '111';
  let name2: string = name1   // 不报错
  ```

- **unkonwn**可赋值对象只有**unknown**和**any**

  ```typescript
  let bbb: unknown = '123';
  let aaa: any = '456';
  aaa = bbb
  ```

- **any**类型在对象没有这个属性的时候获取不会报错，如果是**unknown**，是不能调用属性和方法

  ```typescript
  let obj: any = { b: 1 };
  obj.a;   // 不报错
  
  let obj1: unknown = { b: 1, vv: (): number => 211 };
  obj1.b    // 报错
  obj1.vv   // 报错
  ```

  

