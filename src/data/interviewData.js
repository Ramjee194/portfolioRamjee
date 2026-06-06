// interviewData.js

export const interviewQuestions = {
  java: {
    title: "Java Interview Questions",
    questions: [
      { q: "What is the difference between JDK, JRE, and JVM?", a: "JVM (Java Virtual Machine) executes the bytecode. JRE (Java Runtime Environment) provides the libraries and JVM to run the app. JDK (Java Development Kit) contains the JRE and development tools (compiler, debugger, etc.)." },
      { q: "Why is Java not a pure object-oriented language?", a: "Because it supports primitive data types like int, float, double, char, etc., which are not objects." },
      { q: "What is the difference between String, StringBuffer, and StringBuilder?", a: "String is immutable. StringBuffer is mutable and thread-safe (synchronized). StringBuilder is mutable but not thread-safe (faster)." }
    ]
  },
  javascript: {
    title: "JavaScript Interview Questions",
    questions: [
      { q: "What is a closure in JavaScript?", a: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created." },
      { q: "What is the event loop in JavaScript?", a: "The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded, by offloading operations to the system kernel whenever possible." },
      { q: "Explain the difference between '==' and '==='.", a: "The '==' operator performs type coercion before comparing two values, whereas the '===' operator compares both the value and the type without coercion." }
    ]
  },
  react: {
    title: "React Interview Questions",
    questions: [
      { q: "What is the Virtual DOM?", a: "A lightweight representation of the real DOM. React updates the Virtual DOM first, compares it with the previous snapshot (diffing), and then updates only the changed parts of the real DOM (reconciliation)." },
      { q: "What are React Hooks?", a: "Functions that let you use state and other React features in functional components without writing a class (e.g., useState, useEffect, useContext)." },
      { q: "What is the purpose of keys in React lists?", a: "Keys help React identify which items have changed, been added, or been removed, giving stable identities to list elements for optimal rendering performance." }
    ]
  },
  nodejs: {
    title: "Node.js Interview Questions",
    questions: [
      { q: "What is Node.js and why is it single-threaded?", a: "Node.js is a runtime built on Chrome's V8 engine. It uses a single thread to run your Javascript code, handling concurrency via its event-driven, non-blocking I/O model (using libuv threads for system tasks)." },
      { q: "What are streams in Node.js?", a: "Streams are collections of data—like arrays or strings—but they might not be available all at once and don't need to fit in memory. They are read/write channels for handling large files efficiently." },
      { q: "What is middleware in Express?", a: "Middleware functions are functions that have access to the request object (req), response object (res), and the next function in the app's request-response cycle." }
    ]
  },
  mongodb: {
    title: "MongoDB Interview Questions",
    questions: [
      { q: "What is MongoDB?", a: "MongoDB is a document-oriented NoSQL database that stores data in JSON-like documents with dynamic schemas (BSON format)." },
      { q: "What is an indexing in MongoDB?", a: "Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must scan every document in a collection to select those documents matching the query statement." },
      { q: "What is the aggregation framework in MongoDB?", a: "A pipeline-based data processing framework that allows you to filter, transform, and group documents using stages like $match, $group, $sort, and $project." }
    ]
  },
  dbms: {
    title: "DBMS Interview Questions",
    questions: [
      { q: "What are ACID properties in database management?", a: "ACID stands for Atomicity (all or nothing), Consistency (preserves database rules), Isolation (independent transactions), and Durability (permanent changes)." },
      { q: "What is normalization and why is it used?", a: "Normalization is the process of organizing data in a database to reduce data redundancy and prevent anomalies (insert, update, delete anomalies)." },
      { q: "What is the difference between Primary Key and Unique Key?", a: "A Primary Key uniquely identifies a record and cannot contain NULL values. A Unique Key also enforces uniqueness but allows a single NULL value (in most RDBMS)." }
    ]
  },
  os: {
    title: "Operating System Questions",
    questions: [
      { q: "What is a deadlock and what are the conditions for it?", a: "A state where processes are blocked because each process holds a resource and waits for another resource held by someone else. Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait." },
      { q: "What is paging and segmentations?", a: "Paging is a memory management scheme that eliminates physical allocation of contiguous memory by dividing memory into fixed-size blocks (pages). Segmentation divides memory into variable-sized logical segments." },
      { q: "What is virtual memory?", a: "A memory management technique that allows the execution of processes that are not completely in the main memory by utilizing secondary storage as an extension of RAM." }
    ]
  },
  cn: {
    title: "Computer Network Questions",
    questions: [
      { q: "What are the layers of the OSI Model?", a: "Physical, Data Link, Network, Transport, Session, Presentation, Application layers (Mnemonic: Please Do Not Throw Sausage Pizza Away)." },
      { q: "What is the difference between TCP and UDP?", a: "TCP (Transmission Control Protocol) is connection-oriented, reliable, and guarantees packet order. UDP (User Datagram Protocol) is connectionless, fast, and does not guarantee delivery or order." },
      { q: "What happens when you type a URL in the browser?", a: "1. DNS lookup resolves IP. 2. Browser opens TCP connection (SYN-ACK). 3. Sends HTTP GET request. 4. Server processes and replies with html/css/js. 5. Browser renders the page." }
    ]
  },
  oops: {
    title: "OOPs Questions",
    questions: [
      { q: "What are the 4 main pillars of OOPs?", a: "1. Inheritance (reusing code), 2. Polymorphism (many forms), 3. Encapsulation (data binding/hiding), 4. Abstraction (hiding implementation details)." },
      { q: "What is the difference between overloading and overriding?", a: "Overloading: Compile-time polymorphism; same method name, different parameters. Overriding: Runtime polymorphism; subclass provides specific implementation of a parent method." },
      { q: "What is an abstract class vs interface?", a: "An abstract class can have instance fields and concrete methods, supporting single inheritance. An interface defines a contract, can have static variables, and supports multiple inheritance." }
    ]
  },
  systemDesign: {
    title: "System Design Basics",
    questions: [
      { q: "What is vertical vs horizontal scaling?", a: "Vertical scaling (scaling up) means adding more power (CPU, RAM) to an existing server. Horizontal scaling (scaling out) means adding more server nodes to your pool." },
      { q: "What is load balancing?", a: "A load balancer distributes incoming network traffic across a group of backend servers, ensuring high availability, reliability, and preventing server overload." },
      { q: "What is caching and how does it work?", a: "Caching is storing copies of data in a high-speed data access layer (like Redis or Memcached) to serve requests faster than querying the main database." }
    ]
  },
  behavioral: {
    title: "Behavioral Questions",
    questions: [
      { q: "How do you handle conflict in a team?", a: "Use the STAR method: explain the situation, describe the task, detail your constructive action (listening, discussing compromises), and outline the positive result." },
      { q: "Describe a time you failed and what you learned.", a: "Mention a genuine mistake, explain how you fixed it, and highlight the technical or professional lesson you learned and applied in subsequent work." }
    ]
  },
  hr: {
    title: "HR Questions",
    questions: [
      { q: "Tell me about yourself.", a: "Highlight your education (B.Tech at AKTU), your technical stack (MERN stack, Javascript, Java), key projects (Airbnb clone, LMS), and your career ambitions." },
      { q: "Why should we hire you?", a: "Focus on your strong coding foundations, problem-solving skills, experience building real-world projects, and your adaptability as a quick learner." }
    ]
  }
};
