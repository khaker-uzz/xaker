const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('startScreen');
const hackedBox = document.getElementById('hackedBox');
const alarmOverlay = document.getElementById('alarmOverlay');
const sirenSound = document.getElementById('sirenSound');
const countdownEl = document.getElementById('countdown');
const revealBtn = document.getElementById('revealBtn');
const logs = document.getElementById('logs');

let timeLeft = 30;
let timerInterval;

startBtn.addEventListener('click', () => {
    // 1. Ekran rejimi va qizil chiroq
    startScreen.classList.add('hidden');
    hackedBox.classList.remove('hidden');
    alarmOverlay.style.display = 'block';

    // To'liq ekran rejimiga o'tkazish
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }

    // Sirenani chalish
    sirenSound.play().catch(() => {});

    // Speech AI — Qo'rqituvchi inglizcha ovoz
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance("Warning! Your device has been compromised. All personal data is being extracted.");
        msg.lang = 'en-US';
        msg.rate = 0.9;
        window.speechSynthesis.speak(msg);
    }

    // Orqaga sanash taymeri
    timerInterval = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            countdownEl.textContent = "00:00";
        }
    }, 1000);

    // Qo'shimcha soxta xabarlar chiqarish
    setTimeout(() => { logs.innerHTML += "<p>> Telegram sessiyalari ko'chirilmoqda...</p>"; }, 3000);
    setTimeout(() => { logs.innerHTML += "<p>> Parollar shifrsizlantirildi...</p>"; }, 6000);
});

// Xazil ekanini oshkor qilish
revealBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    sirenSound.pause();
    alarmOverlay.style.display = 'none';
    
    hackedBox.innerHTML = `
        <h1 style="color:#00ff00;">😂 BO'LDI, TINGCHLIK!</h1>
        <p style="color:#fff; font-size:18px; margin:20px 0;">
            Bu oddiy xazil edi (Prank)! Qo'rqib ketdingizmi? 😜
        </p>
        <button onclick="location.reload()" style="background:#00ff00; border:none; padding:10px 20px; font-weight:bold; cursor:pointer;">Qaytadan</button>
    `;
});