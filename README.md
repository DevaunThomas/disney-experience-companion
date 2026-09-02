# 🎢 Disney Experience Companion

**Disney Experience Companion** is a modern web application built with **Next.js, React, and TypeScript** that helps guests plan visits to **Disneyland Resort**.

Users can explore attractions across **Disneyland Park** and **Disney California Adventure**, search and filter rides, view simulated wait times and attraction statuses, save favorites, and create personalized park itineraries.

The project is designed as both a functional trip-planning application and a demonstration of modern frontend software engineering practices, including type-safe development, component-based architecture, authentication, testing, and maintainable application design.

> **Status:** 🚧 Currently in development

---

## ✨ Features

- Browse attractions across both Disneyland Resort parks
- Search attractions by name
- Filter attractions by park, land, and thrill level
- View simulated attraction wait times
- View attraction operating status
- Save favorite attractions
- Build personalized park itineraries
- User authentication
- Responsive layouts for desktop and mobile
- Unit and component testing

---

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Authentication

- **Auth.js**
- Google OAuth
- Apple authentication
- Local development credentials

### Testing

- **Vitest**
- **React Testing Library**

### Development

- Git
- GitHub
- Node.js
- npm

---

## 📸 Application Preview

### Home

The landing page introduces the application and provides access to the primary planning features.

<img width="1290" height="571" alt="Disney Experience Companion Home Page" src="https://github.com/user-attachments/assets/f6b82bea-9aa9-45a7-a883-f595d90f3643" />

### Itinerary Planner

Users can organize attractions into a personalized itinerary for their park visit.

<img width="1164" height="561" alt="Disney Experience Companion Itinerary Page" src="https://github.com/user-attachments/assets/ce23faba-330b-4e95-87f7-8ad00acc2ba2" />

### Attraction Search

The attraction browser allows users to explore and filter rides from Disneyland Park and Disney California Adventure.

<img width="1308" height="528" alt="Disney Experience Companion Attraction Lookup" src="https://github.com/user-attachments/assets/0e23316a-0fa7-4c41-93f9-95f1a6e9c783" />

---

## 🎯 Engineering Focus

The project is designed around modern frontend software engineering practices with an emphasis on:

- Component-based architecture
- Type-safe development with TypeScript
- Reusable UI components
- Feature-oriented application organization
- State management
- Responsive UI/UX
- Automated testing
- Separation of application logic and presentation
- Maintainable and readable code
- Real-world application design

---

## 🏗️ Project Architecture

The application uses a feature-oriented structure to keep domain-specific functionality separated while allowing common components, hooks, utilities, and types to be reused throughout the application.

```text
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

Domain-specific functionality such as attractions, favorites, and itinerary management is organized into feature areas, while reusable UI components and shared application utilities remain separate.

This structure is intended to make the application easier to maintain and extend as additional functionality is introduced.

---

## 💡 Key Engineering Decisions

### Type-Safe Domain Models

Attraction data is modeled using TypeScript interfaces and constrained property types.

Attraction information can include properties such as:

- Park
- Land
- Attraction type
- Height requirement
- Wait time
- Operating status

Using TypeScript for the domain model provides compile-time validation and reduces the possibility of invalid application state being passed between components.

---

### Component-Based UI

The interface is divided into reusable React components rather than implementing entire pages as large components.

For example, attraction information can be represented through reusable attraction-card components that receive typed attraction data through props.

This makes UI behavior easier to reuse, test, and maintain.

---

### Feature-Oriented Organization

Application functionality is organized around features such as:

- Attractions
- Favorites
- Itinerary planning
- Dashboard functionality

This keeps related components and application logic together instead of placing all functionality into large generic folders.

---

### Simulated Wait Times

The application currently uses simulated attraction wait times rather than depending on an unofficial external Disney wait-time API.

This allows the attraction interface, filtering system, itinerary features, and other wait-time-dependent functionality to be developed independently of an external service.

A future version could replace the simulation layer with an appropriate live-data provider without requiring the UI architecture to be completely redesigned.

---

### Development vs. Production Authentication

The application supports third-party authentication through Auth.js while also providing local credential accounts for development.

Development credential storage is intentionally separated from a future production authentication architecture.

A production implementation would move credential data to persistent database storage and introduce additional security controls such as rate limiting, account verification, and password recovery.

---

## 🔐 Authentication

Authentication is implemented using **Auth.js**.

The application supports:

- Google OAuth
- Apple authentication
- Local development credentials

Local credential passwords are salted and hashed before being stored.

During development, local accounts are stored in a git-ignored local data store. This approach allows authentication workflows to be developed and tested without requiring production database infrastructure.

A production deployment would replace the local data store with persistent database-backed user accounts.

### Production Authentication Improvements

Before credential authentication is used in production, additional protections should include:

- Persistent database storage
- Rate limiting
- Email verification
- Password recovery
- Improved account-management functionality
- Production secrets management

---

## ⚙️ Account Provider Setup

The application uses Auth.js for Google and Apple authentication.

Copy the example environment configuration:

```bash
cp .env.example .env.local
```

Generate an Auth.js secret:

```bash
npx auth secret
```

Then configure the appropriate credentials from the Google and Apple developer consoles.

### Google Callback

```text
http://localhost:3000/api/auth/callback/google
```

### Apple Callback

```text
https://your-domain.com/api/auth/callback/apple
```

Replace the host with the production domain when deploying the application.

> Apple authentication requires an HTTPS return URL and a generated client-secret JWT.

Restart the development server after changing authentication environment variables.

---

## 🧪 Testing

The project uses:

- **Vitest**
- **React Testing Library**

Testing focuses on application behavior and reusable UI components.

The testing strategy will continue to expand as additional application functionality is implemented.

---

## 🚧 Development Progress

- [x] Attraction browser
- [x] Search and filtering
- [x] Favorites
- [x] Daily itinerary planner
- [x] Wait-time simulation
- [x] Authentication
- [ ] Park statistics dashboard
- [ ] Dark mode
- [ ] Accessibility improvements
- [x] Unit and component testing
- [ ] Production deployment

> Development progress reflects the current state of the project and will be updated as features are completed.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/<your-username>/disney-experience-companion.git
cd disney-experience-companion
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Copy the provided environment example:

```bash
cp .env.example .env.local
```

Configure any authentication providers you want to use.

### Start the Development Server

```bash
npm run dev
```

Open the application in your browser at:

```text
http://localhost:3000
```

---

## 🔮 Future Enhancements

Potential future improvements include:

- Cloud-hosted database
- Live attraction wait-time integration
- Interactive park map
- Attraction recommendation engine
- Trip sharing
- Expanded itinerary optimization
- Additional accessibility features
- Improved park analytics
- Production deployment

---

## 📚 What I'm Learning

This project continues to provide hands-on experience with:

- Designing larger React applications
- Next.js application architecture
- TypeScript domain modeling
- Component composition and reuse
- State management
- Authentication workflows
- Frontend testing
- Responsive application design
- Feature organization
- Separating development and production concerns
- Making architectural decisions as an application grows

The project is being developed iteratively, with features added and refactored as new requirements and engineering challenges are introduced.

---

## 📄 Disclaimer

This project is an independent educational and portfolio project and is **not affiliated with, endorsed by, or sponsored by The Walt Disney Company**.

Disneyland Resort, Disneyland Park, Disney California Adventure, attraction names, trademarks, and other related intellectual property belong to their respective owners and are used here solely for educational and demonstration purposes.
