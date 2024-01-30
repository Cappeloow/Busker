# Busker - Social Media Platform for Artists

Busker is a full-stack social media platform designed for artists. It allows artists to showcase their profile, share links, and manage their availability through a calendar system. The artists can also buy their own QR-Code based Items from the store. Which can benefit them when they're playing live somewhere on a bar, festival or simply on the street. This simplifiy the connection between the audience and artists and the audience can really get to know you in no time by passing in all your social media links.

## Features
- **Buy your own QR Code Kit such as Signs and Hoodies**
- **Get your own QR Code**
- **Profile Management:** Create and manage your artist profile.
- **Link Sharing:** Share links to your portfolio, social media, or any other relevant content.
- **Availability Calendar:** Set your availability for events, gigs, or collaborations.
- **Google OAuth2 Integration:** Securely authenticate with your Google account for a seamless login experience.
- **Image Upload:** Upload and manage your profile image.

## Tech Stack

### Backend
#### For versions check package.json
- Node.js
- Express.js
- Sequelize (MySQL database)
- Passport.js (Google OAuth2)
- Multer (File upload)
- **Google Cloud Storage (Image storage)**
- Canvas (Image manipulation)
- QRCode (Generate QR codes)
- and more...

### Frontend
#### For versions check package.json
- Next.js
- React
- React Datepicker
- React Icons
- TypeScript
- SASS
- ESLint

## Getting Started

### Prerequisites

- Node.js
- npm
- MySQL database

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Cappeloow/Busker.git



`cd backend
npm install
npm run dev`

`cd frontend
npm install
npm run dev `

` Visit http://localhost:3000 in your browser. `
