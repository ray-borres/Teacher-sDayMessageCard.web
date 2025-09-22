const message = `Happy Teacher's Day
Dear Sir Randy,

You are not just a teacher, you are a dream builder.
Every lesson you share ignites the spark of possibility.
Every word you speak plants seeds of greatness.

You transform minds, inspire hearts, and shape destinies.
In your classroom, ordinary students become extraordinary dreamers.
Your passion lights the path to our brightest future.

Thank you for believing in us when we couldn't believe in ourselves.
Thank you for seeing our potential before we could see it.
Thank you for being the hero in our story of success.

You don't just teach subjects—you teach us to reach for the stars!

Happy Teacher's Day to our incredible mentor!
— Your Forever Grateful Student
Raymundo Borres`;

        const textContainer = document.getElementById("typed-text");
        const resetBtn = document.getElementById("reset-btn");
        const magicCursor = document.querySelector('.magic-cursor');
        const hiddenMessage = document.getElementById('hiddenMessage');

        let i = 0;
        let typingSpeed = 80;
        let isTyping = false;
        let currentMode = 'rainbow';
        let mouseX = 0,
            mouseY = 0;

        const fonts = ['font-sacramento', 'font-dancing', 'font-fredoka', 'font-caveat', 'font-kalam'];
        const quotes = [
            "Education is the most powerful weapon! 💪",
            "Teachers change the world one student at a time! 🌍",
            "The best teachers teach from the heart! ❤️",
            "Learning never exhausts the mind! 🧠",
            "Teachers inspire dreams and shape futures! 🌟"
        ];

        // Custom cursor following
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            magicCursor.style.left = mouseX + 'px';
            magicCursor.style.top = mouseY + 'px';

            // Create magic trail
            if (Math.random() > 0.7) {
                createMagicTrail(mouseX, mouseY);
            }
        });

        function createMagicTrail(x, y) {
            const trail = document.createElement('div');
            trail.className = 'magic-trail';
            trail.style.left = x + 'px';
            trail.style.top = y + 'px';
            document.body.appendChild(trail);

            setTimeout(() => trail.remove(), 1000);
        }

        function type() {
            if (i < message.length) {
                isTyping = true;
                const char = message[i];

                // Create span for character with random styling in rainbow mode
                if (currentMode === 'rainbow' && char !== '\n' && char !== ' ') {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = fonts[Math.floor(Math.random() * fonts.length)];
                    textContainer.appendChild(span);
                } else {
                    textContainer.textContent += char;
                }

                i++;

                // Special effects on punctuation
                if (char === '!' || char === '.' || char === ',') {
                    createFirework();
                    changeBackgroundColor();
                }

                // Line break effects
                if (char === '\n') {
                    createQuoteBubble();
                }

                setTimeout(type, typingSpeed);
            } else {
                // Animation completed
                isTyping = false;
                textContainer.classList.add('completed');
                resetBtn.classList.add('show');

                // Grand finale fireworks
                for (let j = 0; j < 10; j++) {
                    setTimeout(() => createFirework(), j * 300);
                }
            }
        }

        function createFirework() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';

            document.body.appendChild(firework);

            setTimeout(() => firework.remove(), 2000);
        }

        function changeBackgroundColor() {
            const hue = Math.random() * 360;
            document.body.style.filter = `hue-rotate(${hue}deg)`;
            setTimeout(() => {
                document.body.style.filter = 'hue-rotate(0deg)';
            }, 1000);
        }

        function createQuoteBubble() {
            const bubble = document.createElement('div');
            bubble.className = 'quote-bubble';
            bubble.textContent = quotes[Math.floor(Math.random() * quotes.length)];
            bubble.style.left = Math.random() * (window.innerWidth - 200) + 'px';
            bubble.style.top = Math.random() * (window.innerHeight - 100) + 'px';

            document.body.appendChild(bubble);

            setTimeout(() => bubble.remove(), 8000);
        }

        function resetAnimation() {
            i = 0;
            textContainer.innerHTML = '';
            textContainer.classList.remove('completed');
            resetBtn.classList.remove('show');

            // Clear all dynamic elements
            document.querySelectorAll('.quote-bubble').forEach(el => {
                if (!el.style.top.includes('15%')) el.remove();
            });

            type();
        }

        function setSpeed(speed) {
            typingSpeed = speed;
            document.querySelectorAll('.speed-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
        }

        function setMode(mode) {
            currentMode = mode;
            document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            if (mode === 'classic') {
                textContainer.style.fontFamily = 'Arial, sans-serif';
                textContainer.style.color = '#ffffff';
                textContainer.style.fontWeight = '600';
                textContainer.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
            }
        }

        function setColor(color) {
            document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            // Change all existing text to the selected color
            if (currentMode === 'classic') {
                textContainer.style.color = color;
            } else {
                // In rainbow mode, change all spans to the selected color
                document.querySelectorAll('#typed-text span').forEach(span => {
                    span.style.color = color;
                });
            }
        }

        function setBgColor(color) {
            document.querySelectorAll('.bg-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            if (color === 'gradient') {
                // Restore original gradient background
                document.body.style.background = 'linear-gradient(45deg, #1a237e, #3949ab, #5e35b1, #7b1fa2, #ad1457)';
                document.body.style.backgroundSize = '400% 400%';
                document.body.style.animation = 'gradientShift 8s ease infinite';
            } else {
                // Set solid color background
                document.body.style.background = color;
                document.body.style.backgroundSize = 'auto';
                document.body.style.animation = 'none';
            }
        }

        function triggerEasterEgg(type) {
            if (type === 'chalkboard') {
                hiddenMessage.textContent = '🎓 Knowledge is power! You clicked the magic chalkboard! ✨';
            }

            hiddenMessage.classList.add('show');
            setTimeout(() => {
                hiddenMessage.classList.remove('show');
            }, 3000);

            // Create celebration effects
            for (let i = 0; i < 5; i++) {
                setTimeout(() => createFirework(), i * 100);
            }
        }

        // Click anywhere for sparkles
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.speed-btn, .mode-btn, .color-btn, .bg-btn, .reset-btn, .chalkboard')) {
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        const sparkle = document.createElement('div');
                        sparkle.textContent = ['✨', '⭐', '🌟', '💫', '🎉'][Math.floor(Math.random() * 5)];
                        sparkle.style.position = 'absolute';
                        sparkle.style.left = (e.clientX + (Math.random() - 0.5) * 100) + 'px';
                        sparkle.style.top = (e.clientY + (Math.random() - 0.5) * 100) + 'px';
                        sparkle.style.fontSize = '20px';
                        sparkle.style.pointerEvents = 'none';
                        sparkle.style.animation = 'sparkle 2s ease-out forwards';

                        document.body.appendChild(sparkle);

                        setTimeout(() => sparkle.remove(), 2000);
                    }, i * 50);
                }
            }
        });

        // Start the magic
        type();

        // Periodic quote bubbles
        setInterval(() => {
            if (Math.random() > 0.7) {
                createQuoteBubble();
            }
        }, 5000);

        // Constellation effect
        setInterval(() => {
            const stars = document.querySelectorAll('.star');
            stars.forEach(star => {
                star.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.4})`;
            });
        }, 2000);

(function() {
            function c() {
                var b = a.contentDocument || a.contentWindow.document;
                if (b) {
                    var d = b.createElement('script');
                    d.innerHTML = "window.__CF$cv$params={r:'9829f72a00bcb9f9',t:'MTc1ODQ2MTkzMy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
                    b.getElementsByTagName('head')[0].appendChild(d)
                }
            }
            if (document.body) {
                var a = document.createElement('iframe');
                a.height = 1;
                a.width = 1;
                a.style.position = 'absolute';
                a.style.top = 0;
                a.style.left = 0;
                a.style.border = 'none';
                a.style.visibility = 'hidden';
                document.body.appendChild(a);
                if ('loading' !== document.readyState) c();
                else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
                else {
                    var e = document.onreadystatechange || function() {};
                    document.onreadystatechange = function(b) {
                        e(b);
                        'loading' !== document.readyState && (document.onreadystatechange = e, c())
                    }
                }
            }
        })();

    document.addEventListener('DOMContentLoaded', () => {
      const music = document.getElementById('bg-music');
      const playBtn = document.getElementById('play-btn');

      playBtn.addEventListener('click', () => {
        music.play()
          .then(() => {
            playBtn.style.display = 'none'; // Hide button once music starts
          })
          .catch((error) => {
            console.error('Music play error:', error);
            alert("Please interact with the page to enable audio.");
          });
      });
    });