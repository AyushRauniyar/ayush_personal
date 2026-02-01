// Global variables
let noButtonSpeed = 100;
let moveAttempts = 0;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    initializeEnvelope();
});

// Create floating hearts background
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(), i * 400);
    }
    
    // Continue creating hearts every 800ms
    setInterval(createHeart, 800);
}

function createHeart() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '💖';
    
    // Random horizontal position
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Slight variation in animation duration
    heart.style.animationDuration = (6 + Math.random() * 4) + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (heart && heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 10000);
}

// Initialize envelope functionality
function initializeEnvelope() {
    const envelope = document.getElementById('envelope');
    
    envelope.addEventListener('click', openEnvelope);
}

// Open envelope animation
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const envelopeSection = document.getElementById('envelopeSection');
    const questionSection = document.getElementById('questionSection');
    
    // Add opening animation
    envelope.classList.add('opening');
    
    setTimeout(() => {
        // Hide envelope section
        envelopeSection.style.display = 'none';
        
        // Show question section
        questionSection.style.display = 'block';
        
        // Start progressive text animation
        startProgressiveText();
    }, 1000);
}

// Progressive text animation
function startProgressiveText() {
    const questionText = document.getElementById('questionText');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const words = ['Will', 'You', 'Be', 'My', 'Valentine?'];
    let currentWord = 0;
    
    function showNextWord() {
        if (currentWord < words.length) {
            questionText.innerHTML += (currentWord > 0 ? ' ' : '') + 
                '<span style="opacity: 0; animation: fadeIn 0.8s ease-out forwards; animation-delay: 0.2s;">' + 
                words[currentWord] + '</span>';
            currentWord++;
            
            if (currentWord < words.length) {
                setTimeout(showNextWord, 800);
            } else {
                // Show buttons after text is complete
                setTimeout(() => {
                    buttonsContainer.style.display = 'flex';
                    initializeButtons();
                }, 1000);
            }
        }
    }
    
    // Add fadeIn animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    showNextWord();
}

// Initialize button functionality
function initializeButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    // Yes button functionality
    yesBtn.addEventListener('click', handleYesClick);
    
    // No button functionality - moves away on hover and click
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moveNoButton();
    });
}

// Handle Yes button click
function handleYesClick() {
    const questionSection = document.getElementById('questionSection');
    const successSection = document.getElementById('successSection');
    
    // Create confetti
    createConfetti();
    
    // Create heart rain
    createHeartRain();
    
    // Play celebration sound (if you want to add sound)
    // playSound('celebration');
    
    // Hide question section
    setTimeout(() => {
        questionSection.style.display = 'none';
        successSection.style.display = 'block';
    }, 500);
}

// Move No button away from cursor
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const container = noBtn.parentElement;
    const containerRect = container.getBoundingClientRect();
    
    moveAttempts++;
    
    // Increase speed with each attempt
    noButtonSpeed += 50;
    
    // Gradually increase YES button size and prominence
    const newScale = 0.9 + (moveAttempts * 0.08); // Grows from 0.9 to 1.7+
    const newFontSize = 20 + (moveAttempts * 2); // Grows from 20px to 44px+
    const newPadding = 15 + (moveAttempts * 2); // Grows padding too
    
    yesBtn.style.transform = `scale(${Math.min(newScale, 1.8)})`;
    yesBtn.style.fontSize = `${Math.min(newFontSize, 32)}px`;
    yesBtn.style.padding = `${Math.min(newPadding, 25)}px ${Math.min(newPadding + 15, 40)}px`;
    
    // Add extra glow effect as it grows
    if (moveAttempts >= 3) {
        yesBtn.style.boxShadow = '0 12px 30px rgba(255, 20, 147, 0.6), 0 0 20px rgba(255, 105, 180, 0.4)';
        yesBtn.style.background = 'linear-gradient(45deg, #ff1493, #ff69b4, #ff1493)';
    }
    
    if (moveAttempts >= 6) {
        yesBtn.style.animation = 'heartPulse 0.8s ease-in-out infinite';
    }
    
    if (moveAttempts >= 10) {
        yesBtn.innerHTML = 'YES! Please! 💖';
        yesBtn.style.background = 'linear-gradient(45deg, #ff0080, #ff1493, #ff69b4)';
    }
    
    // Random new position
    const maxX = containerRect.width - noBtn.offsetWidth;
    const maxY = containerRect.height - noBtn.offsetHeight;
    
    const newX = Math.random() * Math.max(0, maxX);
    const newY = Math.random() * Math.max(0, maxY - 50); // Keep some margin from bottom
    
    // Apply movement with increasing speed
    noBtn.style.transition = `all ${Math.max(0.1, 0.5 - moveAttempts * 0.05)}s ease-out`;
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Add some visual feedback
    noBtn.style.transform = `scale(${0.9 - moveAttempts * 0.02}) rotate(${moveAttempts * 10}deg)`;
    
    // If user tries too many times, make it even more playful
    if (moveAttempts >= 5) {
        noBtn.innerHTML = 'Really? 🙄';
        noBtn.style.background = '#ffe4e1';
        noBtn.style.color = '#ff6b6b';
        noBtn.style.borderColor = '#ffb3ba';
    }
    if (moveAttempts >= 8) {
        noBtn.innerHTML = 'Come on! 😅';
        noBtn.style.background = '#fff0e6';
        noBtn.style.color = '#ff8c00';
        noBtn.style.borderColor = '#ffd700';
        noBtn.style.fontWeight = 'bold';
    }
    if (moveAttempts >= 12) {
        noBtn.innerHTML = 'Fine... 😏';
        noBtn.style.fontSize = '14px';
        noBtn.style.background = '#f0e6ff';
        noBtn.style.color = '#8a2be2';
        noBtn.style.borderColor = '#dda0dd';
        noBtn.style.fontWeight = 'bold';
        noBtn.style.textShadow = '1px 1px 2px rgba(0,0,0,0.1)';
    }
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random position and color
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = getRandomColor();
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti && confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 20);
    }
}

// Create heart rain effect
function createHeartRain() {
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-50px';
            heart.style.fontSize = (15 + Math.random() * 15) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '999';
            heart.style.animation = 'float 4s linear forwards';
            
            container.appendChild(heart);
            
            setTimeout(() => {
                if (heart && heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 4000);
        }, i * 50);
    }
}

// Get random confetti color
function getRandomColor() {
    const colors = ['#ff1493', '#ff6b8a', '#ffd700', '#ff69b4', '#ff1493', '#ffa500'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Optional: Play sound function (uncomment if you want to add sound effects)
/*
function playSound(type) {
    // You can add sound files and play them here
    // const audio = new Audio(`sounds/${type}.mp3`);
    // audio.play().catch(e => console.log('Sound play failed:', e));
}
*/

// Easter egg: If user clicks outside multiple times, show encouragement
document.addEventListener('click', function(e) {
    if (!e.target.closest('.question-card') && 
        document.getElementById('questionSection').style.display === 'block') {
        
        const questionText = document.getElementById('questionText');
        if (Math.random() < 0.1) { // 10% chance
            questionText.style.animation = 'bounce 0.5s ease-out';
            setTimeout(() => {
                questionText.style.animation = '';
            }, 500);
        }
    }
});