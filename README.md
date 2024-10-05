# Java Enum in TypeScript

## Overview

This spike explores various approaches to recreating a `Java Enum` in TypeScript,
focusing on adhering to the key rules and characteristics of Java's enum system.
The goal is to analyze the strengths and weaknesses of each implementation, compare them,
and conclude with the best possible design to replicate Java enums in TypeScript.

## Objectives

- Understand the essentials rules of Java enums.
- Implement multiple approaches to mimicking a Java enum in TypeScript.
- Evaluate each approach based on adherence to Java enum principles.
- Conclude with recommendations for the best solution.

## Key Rules of Java Enums

To ensure that our TypeScript implementations closely follow Java enums,
we’ll adhere to the following key rules:

1. **Immutability:** Enum values must be constant and immutable.
2. **Ordinal:** Each enum constant must have a unique index reflecting its declaration order.
3. **Name:** Each enum constant must have a string name representing its declared name.
4. **Type Safety:** Only predefined constants should be allowed for a given enum type.
5. **Comparison:** Enum constants must be comparable based on their ordinal index.
6. **Private Constructor:** The constructor of the enum should be private to prevent the creation of new instances
   outside the predefined constants.
7. **Singleton:** Each enum constant must be a singleton, meaning only one instance exists for each constant.
8. **Value Retrieval:** The enum should provide a way to retrieve all constants (e.g., `values()` method) and lookup
   constants by name (`valueOf()`).
9. **Custom Fields and Methods:** Enum constants should support additional fields (e.g., descriptions) and custom
   methods if needed.
10. **Handling in Value Lookup:** The `valueOf()` method should throw an appropriate exception if a name lookup fails (
    e.g., `IllegalArgumentException` in Java).

## Implementation

We will create the `Day` enum in multiple ways, representing the enumeration containing the days of the week.
Each implementation will be evaluated based on how well it adheres to the key rules of Java enums.

## Solution analysis

### 1. Basic TypeScript Enum

#### Implementation

```typescript
export enum DayTSEnum {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
}

export interface DayTSInterface {
    readonly label: string;
    readonly isWeekend: boolean;
}

const dayTSRecord: Record<DayTSEnum, DayTSInterface> = {
    [DayTSEnum.MONDAY]: {label: 'Monday', isWeekend: false},
    [DayTSEnum.TUESDAY]: {label: 'Tuesday', isWeekend: false},
    [DayTSEnum.WEDNESDAY]: {label: 'Wednesday', isWeekend: false},
    [DayTSEnum.THURSDAY]: {label: 'Thursday', isWeekend: false},
    [DayTSEnum.FRIDAY]: {label: 'Friday', isWeekend: false},
    [DayTSEnum.SATURDAY]: {label: 'Saturday', isWeekend: true},
    [DayTSEnum.SUNDAY]: {label: 'Sunday', isWeekend: true}
};

export namespace DayTSEnumUtils {
    export function label(day: DayTSEnum): string {
        return dayTSRecord[day].label;
    }

    export function isWeekend(day: DayTSEnum): boolean {
        return dayTSRecord[day].isWeekend;
    }

    export function name(day: DayTSEnum): string {
        return day;
    }

    export function ordinal(day: DayTSEnum): number {
        return Object.keys(DayTSEnum).indexOf(day);
    }

    export function toString(day: DayTSEnum): string {
        return DayTSEnumUtils.name(day);
    }

    export function equals(day: DayTSEnum, other: unknown): boolean {
        return day === other;
    }

    export function compareTo(a: DayTSEnum, b: DayTSEnum): number {
        return DayTSEnumUtils.ordinal(a) - DayTSEnumUtils.ordinal(b);
    }

    export function valueOf(name: string): DayTSEnum {
        const result = DayTSEnum[name as keyof typeof DayTSEnum];
        if (null !== result) {
            return result;
        }
        if (null === name) {
            throw new TypeError('Name is null');
        }
        throw new Error(`No enum constant DayTSEnum.${name}`);
    }

    export function values(): DayTSEnum[] {
        return Object.values(DayTSEnum);
    }
}
```

#### Pros

- **Immutability**: The enum values are constant and cannot be changed.
- **Ordinal**: Each enum constant has a unique index based on declaration order.
- **Name**: Each constant has a string representation corresponding to its name.
- **Type Safety**: Only predefined constants of DayTSEnum can be used.
- **Comparison**: Supports comparison using the ordinal value.
- **Value Retrieval**: Provides utility functions for getting all constants and looking them up by name.
- **Custom Fields**: The DayTSInterface allows for additional properties like label and isWeekend.

#### Cons

- **Private Constructor**: There is no private constructor to prevent instantiation outside of the enum; TypeScript
  enums do not support constructors.
- **Singleton Enforcement**: While enums are singletons in usage, there's no explicit enforcement of this concept in the
  code.
- **Lack of Encapsulation**: The utility functions are all static, and they are not encapsulated within the enum itself.

#### Rule Compliance Table

| Rule                      | Compliance       |
|---------------------------|------------------|
| Immutability              | ✅ Yes            |
| Ordinal                   | ✅ Yes            |
| Name                      | ✅ Yes            |
| Type Safety               | ✅ Yes            |
| Comparison                | ✅ Yes            |
| Private Constructor       | ❌ No             |
| Singleton                 | ✅ Yes (implicit) |
| Value Retrieval           | ✅ Yes            |
| Custom Fields and Methods | ✅ Yes            |
| Handling in Value Lookup  | ✅ Yes            | 

### 2. Const Enum

#### Implementation

```typescript
export const DayConstEnum = {
    MONDAY: {label: 'Monday', isWeekend: false},
    TUESDAY: {label: 'Tuesday', isWeekend: false},
    WEDNESDAY: {label: 'Wednesday', isWeekend: false},
    THURSDAY: {label: 'Thursday', isWeekend: false},
    FRIDAY: {label: 'Friday', isWeekend: false},
    SATURDAY: {label: 'Saturday', isWeekend: true},
    SUNDAY: {label: 'Sunday', isWeekend: true}
} as const;

type DayConstEnum = typeof DayConstEnum[keyof typeof DayConstEnum];

export namespace DayConstEnumUtils {
    export function name(day: DayConstEnum): string {
        return Object.keys(DayConstEnum)[DayConstEnumUtils.ordinal(day)];
    }

    export function ordinal(day: DayConstEnum): number {
        return Object.values(DayConstEnum).indexOf(day);
    }

    export function toString(day: DayConstEnum): string {
        return DayConstEnumUtils.name(day);
    }

    export function equals(day: DayConstEnum, other: unknown): boolean {
        return day === other;
    }

    export function compareTo(a: DayConstEnum, b: DayConstEnum): number {
        return DayConstEnumUtils.ordinal(a) - DayConstEnumUtils.ordinal(b);
    }

    export function valueOf(name: string): DayConstEnum {
        const result = DayConstEnum[name as keyof typeof DayConstEnum];
        if (null !== result) {
            return result;
        }
        if (null === name) {
            throw new TypeError('Name is null');
        }
        throw new Error(`No enum constant DayConstEnum.${name}`);
    }

    export function values(): DayConstEnum[] {
        return Object.values(DayConstEnum);
    }
}
```

#### Pros

- **Immutability:** The use of `as const` ensures that the enum values are constant and immutable.
- **Ordinal:** Each enum constant can be accessed by its index based on declaration order.
- **Name:** Each constant has a string representation corresponding to its name.
- **Type Safety:** Only predefined constants can be used since TypeScript ensures type safety through the `const`
  assertion.
- **Comparison:** Supports comparison using the ordinal value.
- **Value Retrieval:** Provides utility functions for getting all constants and looking them up by name.
- **Custom Fields:** Each constant can have additional fields such as `label` and `isWeekend`.

#### Cons

- **Private Constructor:** There is no private constructor to prevent instantiation; the structure is simply an object.
- **Singleton Enforcement:** While each constant is effectively a singleton, there’s no explicit enforcement in the
  implementation.
- **No Built-in Enum Features:** This solution lacks some inherent features of TypeScript enums, such as automatic
  numeric values.

#### Rule Compliance Table

| Rule                      | Compliance       |
|---------------------------|------------------|
| Immutability              | ✅ Yes            |
| Ordinal                   | ✅ Yes            |
| Name                      | ✅ Yes            |
| Type Safety               | ✅ Yes            |
| Comparison                | ✅ Yes            |
| Private Constructor       | ❌ No             |
| Singleton                 | ✅ Yes (implicit) |
| Value Retrieval           | ✅ Yes            |
| Custom Fields and Methods | ✅ Yes            |
| Handling in Value Lookup  | ✅ Yes            |

### 3. Static Class Enum

#### Implementation

```typescript
export class DayStaticClassEnum {

    static readonly MONDAY = new DayStaticClassEnum('Monday', false);
    static readonly TUESDAY = new DayStaticClassEnum('Tuesday', false);
    static readonly WEDNESDAY = new DayStaticClassEnum('Wednesday', false);
    static readonly THURSDAY = new DayStaticClassEnum('Thursday', false);
    static readonly FRIDAY = new DayStaticClassEnum('Friday', false);
    static readonly SATURDAY = new DayStaticClassEnum('Saturday', true);
    static readonly SUNDAY = new DayStaticClassEnum('Sunday', true);

    private constructor(readonly label: string, readonly isWeekend: boolean) {
    }

    get name(): string {
        return Object.keys(DayStaticClassEnum)[this.ordinal];
    }

    get ordinal(): number {
        return Object.values(DayStaticClassEnum).indexOf(this);
    }

    toString(): string {
        return this.name;
    }

    equals(other: unknown): boolean {
        return this === other;
    }

    compareTo(other: DayStaticClassEnum): number {
        return this.ordinal - other.ordinal;
    }

    static valueOf(name: string): DayStaticClassEnum {
        const result = DayStaticClassEnum[name as keyof typeof DayStaticClassEnum] as DayStaticClassEnum;
        if (null !== result) {
            return result;
        }
        if (null === name) {
            throw new TypeError('Name is null');
        }
        throw new Error(`No enum constant DayStaticClassEnum.${name}`);
    }

    static values(): DayStaticClassEnum[] {
        return Object.values(DayStaticClassEnum);
    }
}
```

#### Pros

- **Immutability:** The `readonly` modifier ensures that the enum values cannot be changed after creation.
- **Ordinal:** Each constant can be accessed by its index based on declaration order.
- **Name:** Each constant has a string representation corresponding to its label.
- **Type Safety:** Only predefined constants can be used, and types are strictly enforced through class instances.
- **Comparison:** Supports comparison using the ordinal value.
- **Private Constructor:** Prevents instantiation of new instances, ensuring the singleton nature of each constant.
- **Value Retrieval:** Provides utility functions for getting all constants and looking them up by name.

#### Cons

- **Singleton Instances:** Each constant is a separate instance, which may slightly increase memory usage compared to a
  simpler enum.

#### Rule Compliance Table

| Rule                      | Compliance |
|---------------------------|------------|
| Immutability              | ✅ Yes      |
| Ordinal                   | ✅ Yes      |
| Name                      | ✅ Yes      |
| Type Safety               | ✅ Yes      |
| Comparison                | ✅ Yes      |
| Private Constructor       | ✅ Yes      |
| Singleton                 | ✅ Yes      |
| Value Retrieval           | ✅ Yes      |
| Custom Fields and Methods | ✅ Yes      |
| Handling in Value Lookup  | ✅ Yes      |

### Advanced Static Class Enum

#### Implementation

```typescript
export abstract class Enum<E extends Enum<E>> {

    get name(): string {
        return Object.keys(this.constructor)[this.ordinal];
    }

    get ordinal(): number {
        return Object.values(this.constructor).indexOf(this);
    }

    toString(): string {
        return this.name;
    }

    equals(other: unknown): boolean {
        return this === other;
    }

    compareTo(other: E): number {
        return this.ordinal - other.ordinal;
    }

    static valueOf<T extends Enum<T>>(this: T, name: string): T | any {
        const result = this[name as keyof typeof this] as T;
        if (null !== result) {
            return result;
        }
        if (null === name) {
            throw new TypeError('Name is null');
        }
        throw new Error(`No enum constant ${this.constructor.name}.${name}`);
    }

    static values<T extends Enum<T>>(): T[] | any[] {
        return Object.values(this);
    }
}
```

```typescript
import {Enum} from '../base/enum.base.ts';

export class DayAdvancedStaticClassEnum extends Enum<DayAdvancedStaticClassEnum> {

    static readonly MONDAY = new DayAdvancedStaticClassEnum('Monday', false);
    static readonly TUESDAY = new DayAdvancedStaticClassEnum('Tuesday', false);
    static readonly WEDNESDAY = new DayAdvancedStaticClassEnum('Wednesday', false);
    static readonly THURSDAY = new DayAdvancedStaticClassEnum('Thursday', false);
    static readonly FRIDAY = new DayAdvancedStaticClassEnum('Friday', false);
    static readonly SATURDAY = new DayAdvancedStaticClassEnum('Saturday', true);
    static readonly SUNDAY = new DayAdvancedStaticClassEnum('Sunday', true);

    private constructor(readonly label: string, readonly isWeekend: boolean) {
        super();
    }

    static valueOf(value: string): DayAdvancedStaticClassEnum {
        return super.valueOf<DayAdvancedStaticClassEnum>(value);
    }

    static values(): DayAdvancedStaticClassEnum[] {
        return super.values<DayAdvancedStaticClassEnum>();
    }
}
```

#### Pros

- **Immutability:** The use of `readonly` ensures that the enum values cannot be modified after creation.
- **Ordinal:** Each constant can be accessed by its index based on declaration order, leveraging the base `Enum` class.
- **Name:** Each constant has a string representation based on its label.
- **Type Safety:** Only predefined constants can be used, with strict type checking.
- **Comparison:** Supports comparison using the ordinal value.
- **Private Constructor:** The constructor is private, preventing the creation of new instances outside the defined
  constants.
- **Value Retrieval:** Inherits value retrieval methods from the base `Enum` class, enhancing consistency.
- **Custom Fields and Methods:** Allows for additional fields (`label`, `isWeekend`) and methods from the `Enum` base
  class.

#### Cons

#### Rule Compliance Table

| Rule                      | Compliance |
|---------------------------|------------|
| Immutability              | ✅ Yes      |
| Ordinal                   | ✅ Yes      |
| Name                      | ✅ Yes      |
| Type Safety               | ✅ Yes      |
| Comparison                | ✅ Yes      |
| Private Constructor       | ✅ Yes      |
| Singleton                 | ✅ Yes      |
| Value Retrieval           | ✅ Yes      |
| Custom Fields and Methods | ✅ Yes      |
| Handling in Value Lookup  | ✅ Yes      |

## Conclusion and Ranking of Solutions

**Advanced Static Class Enum - 10/10**  
**Static Class Enum - 10/10**  
**Const Enum - 9/10**  
**Basic TypeScript Enum - 6/10**

The **Advanced Static Class Enum** and **Static Class Enum** solutions are the most comprehensive in TypeScript and
adhere to all feasible rules. The **Const Enum** is also an excellent alternative, although slightly less robust in
terms of exception handling. The **Basic TypeScript Enum** remains functional but lacks advanced features such as custom
fields and value management.
