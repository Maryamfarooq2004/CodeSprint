// Sample data seeder for populating initial chapters
// Run this file to populate your Firestore database with sample chapters

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../src/firebase/config.js';

const sampleChapters = [
  // JavaScript - Beginner
  {
    title: "Variables and Constants",
    category: "Basic Syntax",
    level: "Beginner",
    language: "JavaScript",
    snippet: "let message = 'Hello World';",
    content: `// Variables in JavaScript
let userName = 'Alice';
const PI = 3.14159;
var counter = 0;

// String interpolation
let greeting = \`Hello, \${userName}!\`;
console.log(greeting);

// Numbers and operations
let age = 25;
let nextYear = age + 1;`,
    order: 1
  },
  {
    title: "Functions and Arrow Functions",
    category: "Basic Syntax",
    level: "Beginner",
    language: "JavaScript",
    snippet: "const add = (a, b) => a + b;",
    content: `// Function declarations
function greet(name) {
  return \`Hello, \${name}!\`;
}

// Arrow functions
const multiply = (x, y) => x * y;
const square = n => n * n;

// Function with default parameters
const createUser = (name, role = 'user') => {
  return { name, role, id: Date.now() };
};

console.log(greet('World'));
console.log(multiply(5, 3));`,
    order: 2
  },
  {
    title: "Arrays and Array Methods",
    category: "Data Structures",
    level: "Beginner",
    language: "JavaScript",
    snippet: "const numbers = [1, 2, 3, 4, 5];",
    content: `// Working with arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];

// Array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Adding and removing items
fruits.push('grape');
fruits.unshift('strawberry');
const lastFruit = fruits.pop();`,
    order: 3
  },
  
  // JavaScript - Intermediate
  {
    title: "Object Destructuring",
    category: "ES6+ Features",
    level: "Intermediate",
    language: "JavaScript",
    snippet: "const { name, age } = user;",
    content: `// Object destructuring
const user = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  address: {
    city: 'New York',
    country: 'USA'
  }
};

// Basic destructuring
const { name, age } = user;

// Nested destructuring
const { address: { city } } = user;

// Destructuring with defaults
const { role = 'guest' } = user;

// Function parameter destructuring
const displayUser = ({ name, age }) => {
  console.log(\`\${name} is \${age} years old\`);
};`,
    order: 1
  },
  {
    title: "Async/Await and Promises",
    category: "Asynchronous Programming",
    level: "Intermediate",
    language: "JavaScript",
    snippet: "const data = await fetchUser(id);",
    content: `// Promises and async/await
const fetchUser = async (id) => {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

// Promise chaining
const processData = () => {
  return fetchUser(1)
    .then(user => ({ ...user, processed: true }))
    .catch(error => ({ error: error.message }));
};`,
    order: 2
  },

  // Python - Beginner
  {
    title: "Variables and Data Types",
    category: "Basic Syntax",
    level: "Beginner",
    language: "Python",
    snippet: "name = 'Alice'",
    content: `# Variables and data types in Python
name = 'Alice'
age = 25
height = 5.6
is_student = True

# String formatting
greeting = f"Hello, {name}! You are {age} years old."
print(greeting)

# Lists and dictionaries
fruits = ['apple', 'banana', 'orange']
person = {
    'name': name,
    'age': age,
    'is_student': is_student
}`,
    order: 1
  },
  {
    title: "Functions and Parameters",
    category: "Basic Syntax",
    level: "Beginner",
    language: "Python",
    snippet: "def greet(name, greeting='Hello'):",
    content: `# Functions in Python
def greet(name, greeting='Hello'):
    return f"{greeting}, {name}!"

def calculate_area(length, width):
    """Calculate the area of a rectangle."""
    return length * width

# Lambda functions
square = lambda x: x * x
add = lambda a, b: a + b

# Function with *args and **kwargs
def flexible_function(*args, **kwargs):
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")
    
result = greet('World')
area = calculate_area(10, 5)`,
    order: 2
  },

  // C++ - Beginner
  {
    title: "Variables and Basic I/O",
    category: "Basic Syntax",
    level: "Beginner",
    language: "C++",
    snippet: "int main() { return 0; }",
    content: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Variable declarations
    int age = 25;
    double height = 5.9;
    string name = "Alice";
    bool isStudent = true;
    
    // Basic input/output
    cout << "Hello, " << name << "!" << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << endl;
    
    // User input
    string userInput;
    cout << "Enter your name: ";
    getline(cin, userInput);
    cout << "Welcome, " << userInput << "!" << endl;
    
    return 0;
}`,
    order: 1
  },
  {
    title: "Functions and Parameters",
    category: "Basic Syntax",
    level: "Beginner",
    language: "C++",
    snippet: "int add(int a, int b) { return a + b; }",
    content: `#include <iostream>
using namespace std;

// Function declarations
int add(int a, int b) {
    return a + b;
}

double multiply(double x, double y) {
    return x * y;
}

// Function with default parameters
void greet(string name = "World") {
    cout << "Hello, " << name << "!" << endl;
}

// Function overloading
int max(int a, int b) {
    return (a > b) ? a : b;
}

double max(double a, double b) {
    return (a > b) ? a : b;
}

int main() {
    int sum = add(5, 3);
    double product = multiply(4.5, 2.0);
    
    greet();
    greet("Alice");
    
    cout << "Sum: " << sum << endl;
    cout << "Product: " << product << endl;
    
    return 0;
}`,
    order: 2
  }
];

export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    const chaptersRef = collection(db, 'chapters');
    
    for (const chapter of sampleChapters) {
      await addDoc(chaptersRef, chapter);
      console.log(`Added chapter: ${chapter.title}`);
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Uncomment the line below to run the seeder
// seedDatabase();
