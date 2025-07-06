class CaesarCipher {
    static encrypt(text, shift) {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const base = code < 91 ? 65 : 97;
                return String.fromCharCode((code - base + shift) % 26 + base);
            }
            return char;
        }).join('');
    }

    static decrypt(text, shift) {
        return this.encrypt(text, 26 - shift);
    }

    static reverse(text) {
        return text.split('').reverse().join('');
    }
}

class SpyMissionUI {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.messageHistory = [];
        this.loadHistory();
        this.initializeAnimations();
    }

    initializeElements() {
        this.input = document.getElementById('input');
        this.output = document.getElementById('output');
        this.shift = document.getElementById('shift');
        this.encryptBtn = document.getElementById('encrypt');
        this.decryptBtn = document.getElementById('decrypt');
        this.reverseBtn = document.getElementById('reverse');
        this.copyBtn = document.getElementById('copy');
        this.historyList = document.getElementById('history-list');
        this.strengthBar = document.querySelector('.strength-bar');
        this.strengthText = document.querySelector('.strength-text');
        this.encryptCount = document.getElementById('encryptCount');
        this.decryptCount = document.getElementById('decryptCount');
    }

    bindEvents() {
        this.encryptBtn.addEventListener('click', () => this.handleOperation('encrypt'));
        this.decryptBtn.addEventListener('click', () => this.handleOperation('decrypt'));
        this.reverseBtn.addEventListener('click', () => this.handleOperation('reverse'));
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        this.input.addEventListener('input', () => this.updateStrengthIndicator());

        document.querySelectorAll('.theme-options button').forEach(btn => {
            btn.addEventListener('click', () => this.changeTheme(btn.dataset.theme));
        });
    }

    handleOperation(type) {
        const text = this.input.value;
        const shift = parseInt(this.shift.value);
        let result;

        switch (type) {
            case 'encrypt':
                result = CaesarCipher.encrypt(text, shift);
                this.encryptCount.textContent = parseInt(this.encryptCount.textContent) + 1;
                break;
            case 'decrypt':
                result = CaesarCipher.decrypt(text, shift);
                this.decryptCount.textContent = parseInt(this.decryptCount.textContent) + 1;
                break;
            case 'reverse':
                result = CaesarCipher.reverse(text);
                break;
        }

        this.output.value = result;
        this.addToHistory(text, result, type, shift);
    }

    addToHistory(input, output, operation, shift) {
        const historyItem = {
            timestamp: new Date().toLocaleString(),
            input,
            output,
            operation,
            shift
        };

        this.messageHistory.unshift(historyItem);
        if (this.messageHistory.length > 10) this.messageHistory.pop();
        this.saveHistory();
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = this.messageHistory.map(item => `
            <div class="history-item">
                <div>Operation: ${item.operation} (Shift: ${item.shift || 'N/A'})</div>
                <div>Time: ${item.timestamp}</div>
                <div>Input: ${item.input}</div>
                <div>Output: ${item.output}</div>
            </div>
        `).join('');
    }

    copyToClipboard() {
        this.output.select();
        document.execCommand('copy');

        this.copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            this.copyBtn.textContent = 'Copy to Clipboard';
        }, 2000);
    }

    updateStrengthIndicator() {
        const text = this.input.value;
        let strength = 0;

        if (text.length > 8) strength += 25;
        if (text.match(/[A-Z]/)) strength += 25;
        if (text.match(/[a-z]/)) strength += 25;
        if (text.match(/[0-9]/)) strength += 25;

        this.strengthBar.style.width = `${strength}%`;
        this.strengthText.textContent = `Message Strength: ${this.getStrengthLabel(strength)}`;
    }

    getStrengthLabel(strength) {
        if (strength <= 25) return 'Weak';
        if (strength <= 50) return 'Medium';
        if (strength <= 75) return 'Strong';
        return 'Very Strong';
    }

    saveHistory() {
        localStorage.setItem('messageHistory', JSON.stringify(this.messageHistory));
    }

    loadHistory() {
        const saved = localStorage.getItem('messageHistory');
        if (saved) {
            this.messageHistory = JSON.parse(saved);
            this.updateHistoryDisplay();
        }
    }

    changeTheme(theme) {
        document.querySelectorAll('.theme-options button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-theme="${theme}"]`).classList.add('active');

        const themes = {
            spy: {
                primary: '#00ff00',
                secondary: '#003300',
                background: '#000000',
                text: '#00ff00'
            },
            cyber: {
                primary: '#00ffff',
                secondary: '#003333',
                background: '#000033',
                text: '#00ffff'
            },
            stealth: {
                primary: '#ff0000',
                secondary: '#330000',
                background: '#000000',
                text: '#ff0000'
            }
        };

        const root = document.documentElement;
        const selectedTheme = themes[theme];

        root.style.setProperty('--primary-color', selectedTheme.primary);
        root.style.setProperty('--secondary-color', selectedTheme.secondary);
        root.style.setProperty('--background-color', selectedTheme.background);
        root.style.setProperty('--text-color', selectedTheme.text);
    }

    initializeAnimations() {
        const titles = document.querySelectorAll('.typing-animation');
        titles.forEach(title => {
            title.style.width = '0';
            setTimeout(() => {
                title.style.width = '100%';
            }, 100);
        });
    }
}

class ProfileManager {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadProfile();
    }

    initializeElements() {
        this.profileBtn = document.getElementById('profileBtn');
        this.themeBtn = document.getElementById('themeBtn');
        this.themeModal = document.getElementById('themeModal');
        this.profileModal = document.getElementById('profileModal');
        this.characterModal = document.getElementById('characterModal');
        this.profileForm = document.getElementById('profileForm');
        this.profileImage = document.getElementById('profileImage');
        this.dashboardImage = document.getElementById('dashboardProfileImage');
        this.pictureUpload = document.getElementById('pictureUpload');
        this.uploadPictureBtn = document.getElementById('uploadPictureBtn');
        this.selectCharacterBtn = document.getElementById('selectCharacterBtn');
        this.characterOptions = document.querySelectorAll('.character-option');
    }

    bindEvents() {
        this.profileBtn.addEventListener('click', () => this.toggleModal(this.profileModal));
        this.themeBtn.addEventListener('click', () => this.toggleModal(this.themeModal));
        this.uploadPictureBtn.addEventListener('click', () => this.pictureUpload.click());
        this.selectCharacterBtn.addEventListener('click', () => this.toggleModal(this.characterModal));
        this.pictureUpload.addEventListener('change', (e) => this.handleFileUpload(e));

        this.characterOptions.forEach(option => {
            option.addEventListener('click', () => this.handleCharacterSelect(option));
        });

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCloseModal(e));
        });

        this.profileForm.addEventListener('submit', (e) => this.handleProfileSubmit(e));

        document.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account?')) {
                localStorage.removeItem('userProfile');
                this.profileImage.src = 'default-avatar.png';
                this.dashboardImage.src = 'default-avatar.png';
                document.getElementById('name').value = '';
                document.getElementById('dashboardName').textContent = 'Agent Dashboard';
                this.toggleModal(this.profileModal);
            }
        });
    }

    handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                alert('File size too large. Please choose an image under 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                this.updateProfilePicture(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    handleCharacterSelect(option) {
        const imagePath = option.dataset.image;
        this.updateProfilePicture(imagePath);
        this.toggleModal(this.characterModal);
    }

    updateProfilePicture(src) {
        this.profileImage.src = src;
        this.dashboardImage.src = src;
        this.saveProfile();
    }

    saveProfile() {
        const name = document.getElementById('name').value;
        const profile = {
            picture: this.profileImage.src,
            name: name,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
        document.getElementById('dashboardName').textContent = name ? `${name} Dashboard` : 'Agent Dashboard';
    }

    loadProfile() {
        const profile = JSON.parse(localStorage.getItem('userProfile')) || {
            picture: 'default-avatar.png',
            name: '',
            email: '',
            phone: ''
        };

        this.profileImage.src = profile.picture;
        this.dashboardImage.src = profile.picture;

        Object.keys(profile).forEach(key => {
            const input = document.getElementById(key);
            if (input) input.value = profile[key];
        });

        document.getElementById('dashboardName').textContent = profile.name
            ? `${profile.name} Dashboard`
            : 'Agent Dashboard';
    }

    toggleModal(modal) {
        modal.classList.toggle('active');
    }

    handleCloseModal(e) {
        const modal = e.target.closest('.modal');
        this.toggleModal(modal);
    }

    handleProfileSubmit(e) {
        e.preventDefault();
        this.saveProfile();
        this.toggleModal(this.profileModal);
        alert('Profile updated successfully!');
    }
}

// Initialize the app
const app = new SpyMissionUI();
const profileManager = new ProfileManager();

// 🚀 Intro Animation Remove
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('introScreen').style.display = 'none';
  }, 2500);
});

// 🌙 Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  const root = document.documentElement.style;
  const isDark = getComputedStyle(document.documentElement).getPropertyValue('--bg').includes('0, 0, 0');
  root.setProperty('--bg', isDark ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.7)');
  root.setProperty('--fg', isDark ? '#222' : '#00ffcc');
  root.setProperty('--text', isDark ? '#000' : '#fff');
});

// 🎮 Gamification
let xp = 0;
function updateXP(amount) {
  xp += amount;
  document.getElementById('xpPoints').textContent = xp;
  document.getElementById('xpBar').value = xp % 100;
}

// 🔐 Authentication
document.getElementById('loginBtn').onclick = () => {
  const name = document.getElementById('authName').value;
  const email = document.getElementById('authEmail').value;
  if (name && email) {
    localStorage.setItem('agentProfile', JSON.stringify({ name, email }));
    alert('Welcome Agent ' + name);
  }
};

// 🧠 Cipher Logic
function cipher(text, shift, decrypt = false) {
  if (decrypt) shift = 26 - shift;
  return text.replace(/[a-z]/gi, c =>
    String.fromCharCode((c.toLowerCase().charCodeAt(0) - 97 + shift) % 26 + 97)
  );
}

function typeOutput(text) {
  const output = document.getElementById('outputMessage');
  output.value = '';
  let i = 0;
  const interval = setInterval(() => {
    output.value += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 50);
}

// 🔐 Cipher Buttons
document.getElementById('encryptBtn').onclick = () => {
  const text = document.getElementById('inputMessage').value;
  const shift = parseInt(document.getElementById('shiftValue').value);
  const result = cipher(text, shift);
  typeOutput(result);
  updateXP(10);
};

document.getElementById('decryptBtn').onclick = () => {
  const text = document.getElementById('inputMessage').value;
  const shift = parseInt(document.getElementById('shiftValue').value);
  const result = cipher(text, shift, true);
  typeOutput(result);
  updateXP(10);
};

document.getElementById('reverseBtn').onclick = () => {
  const text = document.getElementById('inputMessage').value;
  typeOutput(text.split('').reverse().join(''));
  updateXP(5);
};

// 🎙 Voice Input
document.getElementById('voiceInput').onclick = () => {
  const r = new webkitSpeechRecognition();
  r.lang = 'en-US';
  r.start();
  r.onresult = (e) => {
    document.getElementById('inputMessage').value = e.results[0][0].transcript;
  };
};

// 📤 Export JSON
document.getElementById('downloadJSON').onclick = () => {
  const data = JSON.stringify(localStorage);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'spy-settings.json';
  a.click();
};

// 📥 Import JSON
document.getElementById('uploadBtn').onclick = () => {
  document.getElementById('uploadJSON').click();
};

document.getElementById('uploadJSON').onchange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result);
    for (let key in data) {
      localStorage.setItem(key, data[key]);
    }
    alert('Settings imported!');
  };
  reader.readAsText(file);
};

// 🔳 QR Code Generator
document.getElementById('generateQR').onclick = () => {
  const text = document.getElementById('outputMessage').value;
  const qrDiv = document.getElementById('qrContainer');
  qrDiv.innerHTML = '';
  new QRCode(qrDiv, text);
};

// 📄 Export PDF
document.getElementById('downloadPDF').onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Encrypted Message Report", 10, 10);
  doc.text(document.getElementById('outputMessage').value, 10, 20);
  doc.save("spy-report.pdf");
};
