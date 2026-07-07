

# Paynest

Paynest is a transaction website that simulates real wallet transactions using Next.js, Turborepo, Express.js, and a demo banking server. The project includes Express.js forming a webhook between the banking system and a Prisma-managed PostgreSQL database.

![Home](image.png)
![transaction](transactions.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)


## Features

- Simulate wallet transactions
- Real-time updates with webhooks
- Secure and efficient database management with Prisma and PostgreSQL
- Modular and scalable architecture with Turborepo

## Tech Stack

- **Frontend:** Next.js
- **Backend:** Express.js ,Next.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Monorepo Management:** Turborepo

## Project Structure

```
paynet/
├── apps/
│   ├── Merchant/              # Next.js frontend for user
│   └── User_app/              # Next.js frontend for merchant
│   └── webhook_express/       # Express.js backend for webhook
│   └──banking_server/         # Express.js backend for demo bank server

├── packages/
│   ├── config/           # Shared configuration
│   └── db/               # Prisma setup and database management
├── .gitignore
├── package.json
├── turbo.json            # Turborepo configuration
└── README.md
```

## Setup

### Prerequisites

- Node.js (>=14.x)
- PostgreSQL
- Prisma CLI

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/paynet.git
   cd paynet
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the database:

   ```sh
   cd packages/db
   npx prisma migrate dev
   ```

4. Set up environment variables:

   Create a `.env` file in the root of the project and add your environment variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/paynet"
   ```

## Usage

### Development

1. Start the development server:

   ```sh
   npm run dev
   ```

   This will start both the Next.js frontend and the Express.js backend.

### Production

1. Build the project:

   ```sh
   npm run build
   ```

2. Start the production server:

   ```sh
   npm start
   ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License.

---

Feel free to modify the README as per your specific requirements and project details.
>>>>>>> d1176b58019f1527fb991dd09543700d768d8728
