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

1. **Immutability:** Enum values should be constant and immutable. 
2. **Ordinal:** Each enum constant should have a unique index (ordinal), reflecting its order of declaration. 
3. **Name:** Enum constants should have a string name representing their declared name. 
4. **Type Safety:** Only predefined constants should be allowed for a given enum type. 
5. **Comparison:** Enum constants should be comparable based on their ordinal. 
6. **Private Constructor:** The constructor of the enum should be private to prevent the creation of new instances outside the predefined constants. 
7. **Singleton:** Each enum constant should be a singleton, meaning only one instance exists for each constant. 
8. **Value Retrieval:** The enum should provide a way to retrieve all constants (e.g., `values()` method) and lookup constants by name (`valueOf()`). 
9. **Custom Fields and Methods:** Enum constants should support additional fields (e.g., descriptions) and custom methods if needed. 
10. **Method Overriding for Constants:** Each enum constant can override methods for customized behavior. 
11. **Heredity Restriction:** Enums implicitly extend a base class (`Enum`) but cannot extend other classes. However, they can implement interfaces. 
12. **Preventing Cloning:** Enum instances should not be clonable, ensuring there’s only one instance per constant. 
13. **Reflection and Serialization:** Enum instances should prevent creation via reflection or serialization. 
14. **Handling in Value Lookup:** The `valueOf()` method should throw an appropriate exception if a name lookup fails (e.g., `IllegalArgumentException` in Java).

## Implementation

We will create the `Day` enum in multiple ways, representing the enumeration containing the days of the week. 
Each implementation will be evaluated based on how well it adheres to the key rules of Java enums.
