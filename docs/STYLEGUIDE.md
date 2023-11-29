# Introduction

This document serves to establish programming conventions and style for the
source code of the WonderTix software. As an open-source project, it is
important for the style to be as consistent as possible to improve its
readability and maintainability in the long-term, as more contributions to the
project are made.

# Project Overview 

This project is implemented with ReactJS, a front-end library for JavaScript.
The project uses TypeScript XML file extensions (.tsx). TypeScript is a
syntactical superset of JavaScript that has the addition of optional static
typing, and JSX/TSX is a syntax extension designed for React that allows the
developer to write code in an XML-like structure for the simplification of
creating UI components. When a React application is run, all code is translated
to pure JavaScript. As such, this document will primarily refer to JavaScript or
JSX, unless it is a subject syntactically exclusive to TypeScript.

# File Organization

The file structure maintains most of the boilerplate structure when any React
project is initially set up. Here is a simplified view of important directories
in the overall hierarchy:

```
wondertix/
  └──node_modules/    # NPM packages and dependencies
  └──server/          # ExpressJS and database scripts
  └──src/             # Client root directory
    └──components/    # Shared UI components
    └──features/      # Discrete UI components
  └──sql-scripts/     # Database initialization scripts
```

This file structure should not be changed, as doing so would potentially
interfere with import statements and references between files.

App components should be PascalCase, and all other helper/utility files in
camelCase.

# 4 Code Style 

This guide's goal is to provide a baseline for coding style, and cannot possibly 
cover everything. In many cases, it will be up to the developer's discretion to
determine what is appropriate, based on the existing source code of the project
and his or her knowledge of common practice. For additional information, you can
refer to the following guides:

[Google - TypeScript style guide](https://google.github.io/styleguide/tsguide.html)
[CSS Tricks - React style guide](https://css-tricks.com/react-code-style-guide/)


## 4a Classes and Functions

* Always use JSX syntax when creating DOM components.

* The arrow function notation should be used over the pre-ES6 function notation.

* Class objects should be declared as TypeScript interfaces before assigning
values to them to enforce typing, for example:

```
interface Circle {
  radius: number;
  units: string;
  getArea(): string;
}

const circle: Circle = {
  radius: 2;
  units: "in";
  getArea: () => {
    return `${PI * this.radius * this.radius} ${this.units}²`;
  }
}
```

## 4b Variable Declarations and Naming Conventions 

* Variable declarations should conform to the following conventions:

```
React components and class objects    # PascalCase
Functions and instance variables      # camelCase
Global constant variables             # UPPER\_SNAKE\_CASE
```

* Variable names should be self-descriptive, with the exception of cases such as
index variables in loops.

## 4c Whitespace, Delimiters, and Arithmetic Operators

* Although semicolons are "optional" in JavaScript, they are implicitly added if
omitted, and therefore it is good practice to add them to the end of every
statement.

* Line length should not exceed 80 characters.

* A single space should go before and after arithmetic operators and curly braces,
and after a delimiting symbol.

* Always use double quotes instead of single quotes for JSX attributes.

* React components can be deeply nested, so to increase readability, one should
separate tags with many properties (generally more than 3) into multiple lines,
like so:

```
<Button
  variant="primary"
  size="lg"
  onClick={handleClick}
  disabled>
  Example Button
</Button>
```

* Always use the "triple-equals" instead of the "double-equals" to check for
equality or inequality.

## 4d Commenting and Documentation

* Comments may be used when they give useful high-level descriptions of what the
program is doing, instead of merely restating what could be immediately inferred
from reading the code. 

* Either //line or /*block*/ comments may be used, though they should appear on
separate lines above the code.
