Alright — I’ll give you a **full, developer-friendly database schema guide** for your Firebase Firestore so GitHub Copilot (or any teammate) can understand exactly how your data is structured, what each collection stores, and how fields relate.

We’ll cover:

* Collection & subcollection structure
* Field names, types, and descriptions
* Indexing notes
* Security rules overview

---

## **📂 Firebase Firestore Schema — CodeSprint Project**

---

### **1️⃣ `/users/{uid}` — User Profiles**

**Purpose:** Stores basic user information and roles.

| Field Name    | Type        | Required | Example Value              | Description           |
| ------------- | ----------- | -------- | -------------------------- | --------------------- |
| `displayName` | `string`    | ✅ Yes    | `"Maryam Farooq"`          | User’s display name   |
| `photoURL`    | `string`    | ❌ No     | `"https://.../avatar.png"` | Profile picture URL   |
| `createdAt`   | `timestamp` | ✅ Yes    | `2025-08-08T10:00:00Z`     | Account creation date |
| `isAdmin`     | `boolean`   | ❌ No     | `false`                    | True if admin         |

🔹 **Document ID:** `uid` (Firebase Auth UID)
🔹 **Indexes:**

* `isAdmin` + `createdAt` (composite) — for admin list queries

---

### **2️⃣ `/chapters/{chapterId}` — Course Content**

**Purpose:** Stores all coding lessons/chapters.

| Field Name | Type     | Required | Example Value            | Description                     |
| ---------- | -------- | -------- | ------------------------ | ------------------------------- |
| `title`    | `string` | ✅ Yes    | `"Simple Variables"`     | Chapter title                   |
| `category` | `string` | ✅ Yes    | `"Basic Syntax"`         | Section this chapter belongs to |
| `level`    | `string` | ✅ Yes    | `"Beginner"`             | Skill level                     |
| `snippet`  | `string` | ❌ No     | `"let x = 5;"`           | Short preview code snippet      |
| `content`  | `string` | ✅ Yes    | `"Full code example..."` | Full code for practice          |
| `order`    | `number` | ✅ Yes    | `1`                      | Order within category           |
| `language` | `string` | ✅ Yes    | `"JavaScript"`           | Programming language            |

🔹 **Document ID:** `chapterId` (slug like `"basic-vars"`)
🔹 **Indexes:**

* `language` + `level` + `order` — for ordered course queries

---

### **3️⃣ `/users/{uid}/progress/{progressId}` — Per-User Progress**

**Purpose:** Tracks which chapters a user has completed and performance.

| Field Name  | Type        | Required | Example Value          | Description               |
| ----------- | ----------- | -------- | ---------------------- | ------------------------- |
| `chapterId` | `string`    | ✅ Yes    | `"basic-vars"`         | ID of completed chapter   |
| `completed` | `boolean`   | ✅ Yes    | `true`                 | Whether user completed it |
| `wpm`       | `number`    | ❌ No     | `45`                   | Words per minute achieved |
| `accuracy`  | `number`    | ❌ No     | `92.5`                 | Accuracy percentage       |
| `updatedAt` | `timestamp` | ✅ Yes    | `2025-08-08T12:00:00Z` | Last updated date         |

🔹 **Document ID:** Auto-generated
🔹 **Indexes:**

* `completed` + `updatedAt` — for progress queries

---

### **4️⃣ `/users/{uid}/typing_stats/{statId}` — Typing Session Logs**

**Purpose:** Stores logs for every practice session.

| Field Name  | Type        | Required | Example Value          | Description          |
| ----------- | ----------- | -------- | ---------------------- | -------------------- |
| `chapterId` | `string`    | ✅ Yes    | `"basic-vars"`         | Chapter practiced    |
| `wpm`       | `number`    | ✅ Yes    | `50`                   | Words per minute     |
| `accuracy`  | `number`    | ✅ Yes    | `95.0`                 | Accuracy percentage  |
| `errors`    | `number`    | ❌ No     | `3`                    | Number of mistakes   |
| `attempts`  | `number`    | ❌ No     | `2`                    | Retry count          |
| `timestamp` | `timestamp` | ✅ Yes    | `2025-08-08T14:00:00Z` | Date/time of attempt |

🔹 **Document ID:** Auto-generated
🔹 **Indexes:**

* `chapterId` + `timestamp` — for per-chapter history

---

### **5️⃣ `/leaderboard/{entryId}` — Global Top Scores**

**Purpose:** Shows best players for each language.

| Field Name    | Type        | Required | Example Value          | Description          |
| ------------- | ----------- | -------- | ---------------------- | -------------------- |
| `userId`      | `string`    | ✅ Yes    | `"abc123"`             | UID of player        |
| `username`    | `string`    | ✅ Yes    | `"CoderX"`             | Display name         |
| `bestWPM`     | `number`    | ✅ Yes    | `120`                  | Highest recorded WPM |
| `avgAccuracy` | `number`    | ❌ No     | `97.5`                 | Average accuracy     |
| `totalTests`  | `number`    | ❌ No     | `42`                   | Total tests taken    |
| `language`    | `string`    | ✅ Yes    | `"JavaScript"`         | Language practiced   |
| `lastUpdated` | `timestamp` | ❌ No     | `2025-08-08T15:00:00Z` | Last updated         |

🔹 **Document ID:** Auto-generated or `userId` if unique per user
🔹 **Indexes:**

* `language` + `bestWPM` (desc) — for top 10 lists

---

## **🔒 Security Rules (Basic Overview)**

* `/users/{uid}` — Read: `request.auth.uid == uid`, Write: `request.auth.uid == uid`
* `/chapters` — Read: `true`, Write: Admin only
* `/users/{uid}/progress` — Read/Write: `request.auth.uid == uid`
* `/users/{uid}/typing_stats` — Read/Write: `request.auth.uid == uid`
* `/leaderboard` — Read: `true`, Write: Only authenticated users can write their own entry

---

## **📌 Best Practices for Copilot Understanding**

1. Always **query using filters matching indexes** to avoid “missing index” errors.
2. Use **UID from Firebase Auth** as document ID for `/users`.
3. Keep `string` fields under **1,500 bytes** (e.g., `snippet`, `content`).
4. Use **timestamps instead of strings** for date fields.
5. Maintain a clear **language + category + order** structure for chapters.

---

If you want, I can now make you a **"Copilot UI + Database Interaction Map"** so it not only knows the DB schema but also **which React components connect to which collections**.
That would help it auto-complete full CRUD logic for your app.

Do you want me to prepare that next?
