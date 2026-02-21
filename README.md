# Private Notes App (SecretLekh)

A secure, private note-sharing application built with Next.js 15, Firebase, and Gemini AI.

## Setup Instructions

1.  **Clone the repo**
    ```bash
    git clone https://github.com/Naushad-dev/private-notes-app.git
    cd private-notes-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Copy `.env.local.example` to `.env.local` and fill in your Firebase and Gemini API credentials.
    ```bash
    cp .env.local.example .env.local
    ```
    You need to provide:
    - Firebase Client SDK keys (from Project Settings)
    - Firebase Admin SDK keys (Service Account JSON)
    - Google Gemini API Key (from AI Studio)

    **Note:** For Firebase Admin, you need to stringify your private key properly if putting it in a single line env var, or use the `.env.local` format carefully.

4.  **Firebase Setup**
    - Create a Firebase project.
    - Enable **Authentication** (Email/Password + Google).
    - Enable **Firestore Database**.
    - Initialize Firestore in **Native Mode**.
    - Set Firestore rules to allow read/write for now (secure them later).

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

- **Secure Note Creation**: Create notes protected by a unique, auto-generated password.
- **Auto-Expiry**: Set notes to expire after 1 hour, 24 hours, or 7 days.
- **AI Summary**: Summarize long notes instantly using Google Gemini AI.
- **Dashboard**: Helper dashboard to manage your created notes.
- **Link Sharing**: Share a unique URL and password with anyone.
- **Responsive Design**: Beautiful, dark-themed UI built with Tailwind CSS.

## Future Improvements

- End-to-end encryption of note content before storing
- Burn after reading — note deletes itself after first view
- Rate limiting on unlock attempts to prevent brute force
- Rich text editor support
- Note analytics dashboard for creators (partially implemented)
- Email notifications when note is viewed
- Two-factor password protection for sensitive notes
