# Angular E-commerce SPA - Deployment Guide

## Prerequisites
- Node.js (v18+)
- npm (v10+)
- Angular CLI (v18+)

## Development Server
To start the application locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the dev server**:
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build for Production
To create a production-ready build, run:
```bash
ng build --configuration production
```
The build artifacts will be stored in the `dist/ecommerce-app` directory.

## Deploying to Netlify
1. **Install Netlify CLI** (optional, for manual deploy):
   ```bash
   npm install -g netlify-cli
   ```
2. **Drag and Drop**:
   - Go to [app.netlify.com](https://app.netlify.com).
   - Drag the `dist/ecommerce-app/browser` folder onto the deployment area.
3. **Git Integration** (Recommended):
   - Push your code to GitHub/GitLab/Bitbucket.
   - Connect the repository in Netlify.
   - **Build Command**: `ng build`
   - **Publish Directory**: `dist/ecommerce-app/browser`

## Deploying to Vercel
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
2. **Deploy**:
   ```bash
   vercel
   ```
3. **Git Integration**:
   - Connect your repository to Vercel.
   - Vercel usually auto-detects Angular settings.
   - Ensure Output Directory is `dist/ecommerce-app/browser`.

## Hosting on GitHub Pages
```bash
ng build --base-href "https://<username>.github.io/<repo-name>/"
npx angular-cli-ghpages --dir=dist/ecommerce-app/browser
```
