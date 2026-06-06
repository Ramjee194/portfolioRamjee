// gateData.js

export const gateSyllabus = [
  {
    subject: "Engineering Mathematics",
    topics: [
      "Discrete Mathematics: Propositional and first-order logic, sets, relations, functions, partial orders, lattices, groups, graphs (connectivity, matching, coloring)."
    ]
  },
  {
    subject: "Digital Logic",
    topics: [
      "Boolean algebra, minimization of functions, combinatorial circuits (multiplexers, decoders), sequential circuits (latches, flip-flops, registers, counters), number representations."
    ]
  },
  {
    subject: "Computer Organization and Architecture",
    topics: [
      "Machine instructions and addressing modes, ALU, data-path and control unit, instruction pipelining, memory hierarchy (cache, main memory, virtual memory), I/O interface."
    ]
  },
  {
    subject: "Programming and Data Structures",
    topics: [
      "Programming in C, recursion, arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs."
    ]
  },
  {
    subject: "Algorithms",
    topics: [
      "Searching, sorting, hashing, asymptotic worst-case time and space complexity, algorithm design techniques (greedy, dynamic programming, divide-and-conquer), graph search, minimum spanning trees, shortest paths."
    ]
  },
  {
    subject: "Theory of Computation",
    topics: [
      "Regular expressions and finite automata, context-free grammars and push-down automata, regular and context-free languages, pumping lemma, Turing machines and undecidability."
    ]
  },
  {
    subject: "Compiler Design",
    topics: [
      "Lexical analysis, parsing, syntax-directed translation, runtime environments, intermediate code generation, local optimization, instruction scheduling."
    ]
  },
  {
    subject: "Operating System",
    topics: [
      "System calls, processes, threads, CPU scheduling, inter-process communication, synchronization, deadlocks, memory management, file systems, disk scheduling."
    ]
  },
  {
    subject: "Databases",
    topics: [
      "ER-model, relational model (relational algebra, tuple calculus), database design (integrity constraints, normal forms), query languages (SQL), transactions and concurrency control."
    ]
  },
  {
    subject: "Computer Networks",
    topics: [
      "Concept of layering, OSI and TCP/IP protocol stacks, LAN technologies (Ethernet, Wi-Fi), flow and error control techniques, routing algorithms, IPv4/IPv6, routers, TCP/UDP, sockets, application layer protocols (HTTP, HTTPS, DNS, SMTP)."
    ]
  }
];

export const gateStrategy = [
  {
    phase: "Phase 1: Core Conceptual Clarity (Months 1-5)",
    steps: [
      "Understand the weightage: Focus heavily on Mathematics, Programming & Data Structures, and Algorithms first.",
      "Read standard reference textbooks or watch video lectures topic-by-topic.",
      "Make short notes for every subject. Write formulas, definitions, and key results."
    ]
  },
  {
    phase: "Phase 2: Solve PYQs (Months 6-8)",
    steps: [
      "Solve the last 20 years of GATE previous year papers topic-wise as you complete each subject.",
      "Analyze the mistakes and bookmark tricky questions to revisit later.",
      "Improve speed and accuracy on Numerical Answer Type (NAT) questions."
    ]
  },
  {
    phase: "Phase 3: Test Series & Active Revision (Months 9-12)",
    steps: [
      "Join a standard test series. Start with subject-wise tests, then move to multi-subject, and finally full-length mock tests.",
      "Revise from your short notes weekly.",
      "Analyze test results: focus on weak topics and time-management."
    ]
  }
];

export const gateResources = [
  { title: "Syllabus & Weightage Sheet", path: "/notes/java-interview.pdf" },
  { title: "Standard Textbooks Recommendation", path: "/notes/java-interview.pdf" },
  { title: "Short Revision Notes PDF", path: "/notes/java-interview.pdf" }
];
