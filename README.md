# Giga Resume - AI-Powered Resume Builder

A modern, responsive resume builder application built with React that helps users create professional, ATS-friendly resumes with multiple templates and real-time preview.

## 🚀 Features

- **Multiple Resume Templates**: Professional, Modern, Creative, Executive, and Classic designs
- **Real-time Preview**: Live preview as you type with instant updates
- **ATS-Friendly**: Templates optimized for Applicant Tracking Systems
- **PDF Export**: High-quality PDF generation and download
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **User Authentication**: Secure login/signup with JWT tokens
- **Template Switching**: Switch between templates while preserving data
- **Smart Data Management**: Auto-save and data persistence
- **Font Customization**: Multiple font families with dynamic theming
- **Progressive Web App**: PWA capabilities for offline access

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **UI Library**: Material-UI (MUI) 5.14.17
- **Routing**: React Router DOM 6.18.0
- **PDF Generation**: @react-pdf/renderer 4.3.0, jsPDF 2.5.1, html2canvas 1.4.1
- **Styling**: MUI Styles, Custom CSS, Responsive Design
- **Animation**: AnimeJS 4.0.2
- **Build Tool**: Create React App 5.0.1
- **Date Handling**: date-fns 2.30.0
- **File Operations**: file-saver 2.0.5
- **UI Components**: Swiper 11.2.8 for carousel functionality

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/giga-resume.git
cd giga-resume
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create environment files for different environments:

**For Development** (`.env.development`):
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_FRONTEND_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
GENERATE_SOURCEMAP=true
```

**For Production** (Use existing `.env.production`):
```env
REACT_APP_API_URL=https://airesume.gigaversity.in
REACT_APP_FRONTEND_URL=http://resume.gigaversity.in/
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
GENERATE_SOURCEMAP=false
REACT_APP_DISABLE_LOGS=true
```

### 4. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### 6. Serve Production Build Locally

```bash
npm run serve
```

## 📁 Quick Project Overview

```
giga-resume/
├── public/                 # Static assets and HTML template
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── contexts/         # React Context providers
│   ├── utils/           # Utility functions and API calls
│   ├── data/            # Static data and templates
│   ├── styles/          # Custom styling and theme
│   └── assets/          # Images, icons, and static resources
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Runs development server on port 3000 |
| `npm test` | Launches test runner in watch mode |
| `npm run build` | Creates production build |
| `npm run build:prod` | Creates production build without source maps |
| `npm run serve` | Serves production build locally |
| `npm run eject` | **Irreversible** - ejects from Create React App |

## 🌐 Deployment

The application is configured for deployment on:

- **Production**: http://resume.gigaversity.in/
- **Homepage**: Configured in package.json for GitHub Pages compatibility
- **Routing**: Includes `_redirects` file for SPA routing on various hosting platforms

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Configuration

The app uses environment variables for configuration:

- `REACT_APP_API_URL`: Backend API endpoint
- `REACT_APP_FRONTEND_URL`: Frontend domain
- `REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth configuration
- `GENERATE_SOURCEMAP`: Enable/disable source maps
- `REACT_APP_DISABLE_LOGS`: Control console logging in production

## 📖 Documentation

For detailed documentation, see the `/docs` folder:

- [Architecture Overview](./docs/architecture.md)
- [Components Documentation](./docs/components/)
- [API Integration](./docs/api.md)
- [Authentication](./docs/authentication.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support, email support@gigaversity.in or visit our documentation.