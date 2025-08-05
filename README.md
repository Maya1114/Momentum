# 🚀 Momentum Developer Portfolio Tracker

A sleek, lightweight mobile app designed to help developers stay accountable and organized as they build out their portfolio of programming projects.

![Momentum App](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.0-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=flat-square&logo=vite)

## ✨ Features

### 📊 **Dashboard & Progress Tracking**
- **Active Project Management**: Track projects in planning, in-progress, and completed states
- **Progress Visualization**: Interactive progress bars with real-time updates
- **Streak Counter**: Maintain daily coding streaks to stay motivated
- **Quick Stats**: Overview of active projects, ready-to-publish items, and published work

### 🎯 **Portfolio Showcase**
- **Project Publishing**: Transform completed projects into portfolio-ready showcases
- **Rich Project Details**: Add descriptions, features, screenshots, and demo links
- **Public Portfolio**: Share your work with potential employers and collaborators
- **Professional Presentation**: Clean, modern interface for showcasing your skills

### 🏆 **Achievement System**
- **Progress Milestones**: Unlock achievements based on your development activity
- **Streak Rewards**: Celebrate consistency with streak-based achievements
- **Project Completion**: Track and celebrate completed projects
- **Motivational System**: Stay engaged with gamified progress tracking

### 🎨 **Modern UI/UX**
- **Dark Mode Support**: Beautiful dark theme with smooth transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion-powered interactions
- **Accessible Components**: Built with Radix UI for excellent accessibility

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Development**: ESLint, TypeScript strict mode

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/momentum-portfolio-tracker.git
   cd momentum-portfolio-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 How to Use

### Adding Projects
1. Click the **"+New Project"** button on the dashboard
2. Fill in project details (title, description, category, deadline)
3. Set initial progress and status
4. Save to start tracking

### Tracking Progress
- **Drag the progress slider** to update project completion
- **Toggle project status** between planning, in-progress, and completed
- **Edit project details** anytime by clicking the edit button

### Publishing to Portfolio
1. **Complete a project** by setting status to "completed"
2. **Click "Publish to Portfolio"** to add showcase details
3. **Add rich content**: descriptions, features, screenshots, demo links
4. **View in Portfolio tab** to see your published work

### Managing Streaks
- **Daily activity** automatically updates your streak counter
- **Set streak goals** in settings (part-time, full-time, crazy-mode)
- **Track achievements** based on consistency and project completion

## 🎨 Design System

The app uses a custom design system built with Tailwind CSS:

- **Color Palette**: Carefully chosen colors for both light and dark modes
- **Typography**: Inter font family with consistent sizing
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation

## 📁 Project Structure

```
momentum-portfolio-tracker/
├── components/           # React components
│   ├── ui/             # Reusable UI components
│   ├── Dashboard.tsx   # Main dashboard view
│   ├── Projects.tsx    # Portfolio showcase
│   └── ...
├── styles/             # Global styles and CSS
├── types/              # TypeScript type definitions
├── guidelines/         # Development guidelines
└── public/            # Static assets
```

## 🚀 Deployment

This is a frontend-only application that can be deployed to any static hosting service:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### GitHub Pages
1. Add GitHub Pages to your repository settings
2. Set source to GitHub Actions
3. Create a workflow to build and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first styling approach
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **Vite** for the fast development experience

## 📞 Support

If you have any questions or need help with the project:

- **Open an issue** on GitHub
- **Check the guidelines** in the `guidelines/` folder
- **Review the code** for examples and patterns

---

**Built with ❤️ for developers who want to stay organized and showcase their work effectively.** 