# 🎢 Disney Experience Companion

A modern web application built with **Next.js**, **React**, and **TypeScript** that helps guests plan their visit to **Disneyland Resort**. Users can browse attractions, view simulated wait times, save favorite rides, and create personalized park itineraries for **Disneyland Park** and **Disney California Adventure**.

> **Status:** 🚧 Currently in development

---

## Features

* 🎠 Browse attractions from both Disneyland Resort parks
* 🔍 Search and filter attractions by park, land, and thrill level
* ⏱️ View simulated attraction wait times and operating status
* ❤️ Save favorite attractions
* 🗓️ Build a personalized park itinerary
* 📱 Responsive design for desktop and mobile
* 🧪 Unit and component testing

---

## Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Vitest**
* **React Testing Library**

---

## Project Goals

This project was created to practice modern frontend software engineering by focusing on:

* Component-based architecture
* Type-safe development with TypeScript
* State management
* Responsive UI/UX
* Testing
* Clean, maintainable code
* Real-world application design

---

## Project Architecture

```
disney-experience-companion/
├── public/
│   ├── images/
│   ├── icons/
│   └── logos/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │   ├── attractions/
│   │   ├── favorites/
│   │   ├── itinerary/
│   │   └── dashboard/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── utils/
├── tests/
├── README.md
├── .gitignore
├── package.json
└── tsconfig.json
```
---

## Planned Features

* [ ] Attraction browser
* [ ] Search and filtering
* [ ] Favorites
* [ ] Daily itinerary planner
* [ ] Wait time simulation
* [ ] Park statistics dashboard
* [ ] Dark mode
* [ ] Accessibility improvements
* [ ] Unit tests
* [ ] Deployment

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/disney-experience-companion.git
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Future Enhancements

* User authentication
* Cloud database
* Live weather integration
* Interactive park map
* Ride recommendation engine
* Mobile companion app
* Trip sharing

---

## Disclaimer

This project is an independent educational portfolio project and is **not affiliated with, endorsed by, or sponsored by The Walt Disney Company**. All trademarks, attraction names, and park names are the property of their respective owners and are used for educational and demonstration purposes only.

## Account provider setup

The app uses Auth.js for Google and Apple authentication. Copy `.env.example` to `.env.local`, generate `AUTH_SECRET` with `npx auth secret`, and add credentials from the Google and Apple developer consoles.

Register these provider callback URLs (replace the host in production):

- Google: `http://localhost:3000/api/auth/callback/google`
- Apple: `https://your-domain.com/api/auth/callback/apple`

Apple requires an HTTPS return URL and a generated client-secret JWT. Restart the development server after changing environment variables.

### Local credential accounts

During local development, users can also register with a username, email address, and password. Passwords are salted and hashed, and local accounts are stored in the git-ignored `data/users.json` file. The sign-in page includes this development-only test account:

- Email: `test@disneycompanion.local`
- Password: `Disney123!`

Replace the local JSON store with a production database and add rate limiting, email verification, and password recovery before deploying credential authentication publicly.
