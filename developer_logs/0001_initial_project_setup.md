# Initial Project Setup - 2024-04-05

## Project Overview
This document logs the initial setup and configuration of the Speedex project.

## Technology Stack
- **Frontend Framework**: React + TypeScript
- **Build Tool**: Vite
- **UI Components**: Ant Design
- **Backend Services**: Supabase (Auth + Storage)
- **Hosting**: GitHub Pages
- **Routing**: Hash Router (for GitHub Pages compatibility)

## Project Structure
```
speedex/
├── developer_logs/     # Project documentation and decision logs
└── ...                 # Other project files
```

## Key Decisions
1. **GitHub Pages Deployment**
   - Using Hash Router instead of Browser Router to ensure proper routing on GitHub Pages
   - This decision was made to leverage free hosting while maintaining proper routing functionality

2. **Authentication & Storage**
   - Chose Supabase for both authentication and storage
   - Provides a unified solution for backend services
   - Offers real-time capabilities and easy integration with React

3. **UI Framework**
   - Selected Ant Design for its comprehensive component library
   - Provides consistent design system and responsive components
   - Strong TypeScript support

## Notes
- This log follows a migration-style format for tracking project evolution
- Future logs will be numbered sequentially (e.g., 0002_*)
- Each log should include date, decisions made, and rationale 