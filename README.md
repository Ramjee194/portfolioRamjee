# AKTU Notes Hub & Personal Portfolio Platform

A complete educational resources, placement prep, and career strategy hub optimized for AKTU university students, integrated with a personal developer portfolio and a live guestbook message board.

## 🚀 Features

### 1. AKTU Education Hub
- **B.Tech, BCA, and B.Pharm Notes**: Structured, semester-by-semester, unit-wise notes, lab files, manuals, important QA, viva guides, and official syllabi.
- **Notes PDF Support**: Read and download PDF notes directly from the platform.
- **Previous Year Papers (PYQs)**: Organized archives of university exams.

### 2. Career & Exam Preparation
- **Placement Hub**: Structured guides covering core programming languages (C, C++, Java, JS, Python), core Computer Science topics (DBMS, Operating Systems, Computer Networks), and web development tracks.
- **Interview Cheat Sheets**: Searchable QA catalog covering technical concepts, database engines, OOPs, system design, and behavioral questions.
- **GATE Preparation Roadmaps**: Dedicated preparation roadmap, detailed GATE CS/IT syllabus modules, textbooks recommendations, and revision resources.

### 3. Personal Portfolio (`/portfolio`)
- Preserves the original portfolio layout, achievements, dynamic titles, and custom cursor.
- Updated styling with a clean, modern, flat aesthetic (no gradients, no drop/inner shadows) for high legibility.

### 4. Support Live Guestbook (`/contact`)
- Interactive contact form.
- Real-time live guestbook board connected directly to a MongoDB database.
- Inline owner response portal (reply directly on the feed with admin key `admin123`).

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Swiper.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas) using Mongoose ODM.
- **Utilities**: Concurrently, Nodemon.

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ramjee194/portfolioRamjee.git
   cd portfolioRamjee
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup your environment:
   The backend connects to the MongoDB database automatically. (Optional: Check `server.cjs` if you wish to configure a different MongoDB connection string).

---

## 🏃 Running the Application

To run both the Vite frontend server (port `5173`) and the Express Node server (port `5000`) concurrently, run:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Developer Admin Keys (Live Guestbook replies)

To reply to student guestbook messages directly on the live site:
1. Navigate to `/contact`.
2. Scroll to **Live Guestbook** and click **"Reply to messages? (Owner settings)"**.
3. Type the admin password: `admin123`.
4. Submit your replies inline!
