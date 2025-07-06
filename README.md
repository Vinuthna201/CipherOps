# 🕵️ Spy Mission Cipher

A modern, interactive web application for Caesar cipher encryption and decryption with a spy theme, user authentication, and gamification features.

##  Features

-  **Multiple Cipher Algorithms** - Caesar, Vigenère, and Rail Fence ciphers
-  **User Authentication** - Secure signup/login system with database storage
-  **Profile Picture Management** - Upload custom images or choose from assets
-  **QR Code Generation** - Generate QR codes for encrypted messages
-  **PDF Export** - Export encrypted messages as PDF files
-  **Gamification** - XP system with levels and achievements
-  **Modern UI** - Dark/light/infrared themes with glassmorphism design
-  **Voice Input** - Speech-to-text functionality
-  **Statistics Tracking** - Monitor encryption/decryption operations
-  **Cipher Analysis Tools** - Frequency analysis, brute-force, pattern recognition
-  **Advanced Theme Builder** - Custom colors and animated backgrounds
-  **Drag & Drop** - Batch file processing
-  **Keyboard Shortcuts** - Quick access to features

##  Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Authentication:** bcrypt
- **File Upload:** Multer

##  Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Local Development
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spy-mission-cipher.git
   cd spy-mission-cipher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. **Open the application**
   - Navigate to `http://localhost:3000` in your browser
   - You'll be redirected to the login page
   - Create a new account or login with existing credentials

##  Project Structure

```
spy-mission-cipher/
├── assets/
│   └── images/
│       ├── spy1.png
│       ├── spy2.png
│       ├── spy3.png
│       └── spy4.png
├── uploads/           # Created automatically for profile pictures
├── index.html         # Main application page
├── login.html         # Login page
├── signup.html        # Registration page
├── server.js          # Backend server
├── package.json       # Dependencies and scripts
├── vercel.json        # Vercel deployment configuration
├── .gitignore         # Git ignore rules
├── users.db           # SQLite database (created automatically)
├── README.md          # This file
└── DEPLOYMENT.md      # Detailed deployment guide
```

##  How to Use

### Authentication
1. **First Time Users**: Click "Create New Account" to register
2. **Returning Users**: Login with your email and password
3. **Logout**: Use the logout button in the profile section

### Cipher Operations
1. **Select Cipher**: Choose between Caesar, Vigenère, or Rail Fence
2. **Enter Message**: Type or use voice input for your secret message
3. **Set Parameters**: Choose shift value, keyword, or rails as needed
4. **Encrypt/Decrypt**: Click the respective buttons
5. **Export Options**: Copy, download, generate QR code, or export as PDF

### Advanced Features
- **Voice Input**: Click the microphone button to use speech recognition
- **Theme Toggle**: Switch between dark, light, and infrared themes
- **Custom Theme**: Click "Customize Theme" to create your own color scheme
- **Analysis Tools**: Use frequency analysis, brute-force, and pattern recognition
- **Drag & Drop**: Drop text files for batch processing
- **Keyboard Shortcuts**: 
  - `Ctrl+E`: Encrypt
  - `Ctrl+D`: Decrypt
  - `Ctrl+C`: Copy output

##  API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `POST /api/upload-profile-picture` - Profile picture upload
- `GET /api/user/:id` - Get user information
- `GET /api/health` - Health check

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Lottie for animations
- jsPDF for PDF generation
- QRCode.js for QR code generation

##  Support

If you encounter any issues:
1. Check the troubleshooting section in DEPLOYMENT.md
2. Review browser console for errors
3. Ensure all dependencies are properly installed
4. Create an issue on GitHub 
