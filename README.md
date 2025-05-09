# E-commerce Frontend

A modern, responsive e-commerce frontend built with Next.js 15, React 19, and TypeScript. This project implements a feature-rich shopping experience with a focus on performance and user experience.

## 🚀 Features

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - React 19
  - TypeScript
  - Tailwind CSS for styling
  - TanStack Query for data fetching
  - Zustand for state management

- **Authentication & Authorization**
  - Protected routes
  - User authentication
  - Role-based access control

- **Shopping Experience**
  - Product browsing and filtering
  - Shopping cart functionality
  - Order management
  - Order history tracking

- **UI/UX**
  - Responsive design
  - Dark/Light mode support
  - Loading states and skeletons
  - Toast notifications
  - Modern component library

## 🛠️ Prerequisites

- Node.js (Latest LTS version recommended)
- Bun package manager and js runtime
- Git

## 🏗️ Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd frontend_ecommerce_rebuilt
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   ```

## 🚀 Development

To start the development server:

```bash
bun dev
```

The application will be available at `http://localhost:3000`

## 📦 Build

To create a production build:

```bash
bun build
```

To start the production server:

```bash
bun start
```

## 🧪 Testing

Run the linter:

```bash
bun lint
```

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication related pages
│   ├── (protected)/       # Protected routes
│   └── (public)/          # Public pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
├── public/               # Static assets
└── features/             # Feature-specific components and logic
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
