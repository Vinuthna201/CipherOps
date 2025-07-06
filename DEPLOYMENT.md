# 🚀 Deployment Guide - Spy Mission Cipher

This guide will help you deploy your Spy Mission Cipher application to Render (backend) and Vercel (frontend).

## 📋 Prerequisites

- GitHub account
- Render account (free tier available)
- Vercel account (free tier available)
- Git installed locally

## 🔧 Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/spy-mission-cipher.git
   git push -u origin main
   ```

## 🌐 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
- Go to [render.com](https://render.com)
- Sign up with your GitHub account

### 2.2 Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repository

### 2.3 Configure the Service
- **Name:** `spy-mission-backend`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** Free

### 2.4 Environment Variables
Add these environment variables in Render dashboard:
```
NODE_ENV=production
PORT=10000
```

### 2.5 Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Copy the generated URL (e.g., `https://spy-mission-backend.onrender.com`)

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with your GitHub account

### 3.2 Import Project
1. Click "New Project"
2. Import your GitHub repository
3. Select the repository

### 3.3 Configure Project
- **Framework Preset:** Other
- **Root Directory:** `./` (leave empty)
- **Build Command:** Leave empty (not needed for static files)
- **Output Directory:** Leave empty

### 3.4 Environment Variables
Add this environment variable:
```
API_BASE_URL=https://your-render-backend-url.onrender.com/api
```
Replace `your-render-backend-url` with your actual Render URL.

### 3.5 Deploy
- Click "Deploy"
- Wait for deployment to complete
- Your app will be available at `https://your-project-name.vercel.app`

## 🔄 Step 4: Update CORS Configuration

After getting your Vercel URL, update the CORS configuration in `server.js`:

```javascript
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-project-name.vercel.app', 'https://your-project-name.vercel.app/']
        : ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:5500'],
    credentials: true
}));
```

Then redeploy your backend on Render.

## 🧪 Step 5: Test Your Deployment

1. **Test Backend:**
   - Visit `https://your-render-backend-url.onrender.com/api/health`
   - Should return: `{"status":"OK","timestamp":"..."}`

2. **Test Frontend:**
   - Visit your Vercel URL
   - Try to sign up/login
   - Test encryption/decryption features

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure your Vercel URL is added to CORS origins in `server.js`
   - Redeploy backend after updating CORS

2. **Database Issues:**
   - Render uses ephemeral storage, so database resets on redeploy
   - Consider using a persistent database service for production

3. **File Upload Issues:**
   - Uploads are stored in `/tmp` on Render (temporary)
   - Files will be lost on server restart

4. **Environment Variables:**
   - Double-check all environment variables are set correctly
   - Ensure no typos in URLs

### Debugging:
- Check Render logs in the dashboard
- Check Vercel logs in the dashboard
- Use browser developer tools to check network requests

## 📈 Production Considerations

1. **Database:**
   - Consider using PostgreSQL or MongoDB for persistent data
   - Render offers managed databases

2. **File Storage:**
   - Use AWS S3 or similar for file uploads
   - Don't rely on local file system

3. **Security:**
   - Add rate limiting
   - Implement proper JWT authentication
   - Use HTTPS (handled by Render/Vercel)

4. **Monitoring:**
   - Set up logging
   - Monitor performance
   - Set up alerts

## 🎉 Success!

Your Spy Mission Cipher application is now deployed and accessible worldwide!

- **Frontend:** `https://your-project-name.vercel.app`
- **Backend:** `https://your-render-backend-url.onrender.com`

## 🔄 Updates

To update your deployed application:
1. Make changes locally
2. Push to GitHub
3. Render and Vercel will automatically redeploy

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review Render and Vercel documentation
3. Check browser console and network tabs
4. Verify all environment variables are set correctly 