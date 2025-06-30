document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.classList.add(savedTheme);
    }
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark-mode');
        localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark-mode' : '');
    });

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => observer.observe(el));

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');
            
            tabLinks.forEach(item => item.classList.remove('active'));
            tabContents.forEach(item => item.classList.remove('active'));
            
            link.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    const scamOptions = document.querySelectorAll('#scam-challenge .option');
    const scamFeedback = document.querySelector('#scam-challenge .challenge-feedback');
    scamOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const isCorrect = e.target.getAttribute('data-correct') === 'true';
            scamFeedback.classList.remove('feedback-correct', 'feedback-incorrect');
            if (isCorrect) {
                scamFeedback.textContent = "Correct! This message creates false urgency and uses a suspicious URL, which are common red flags.";
                scamFeedback.classList.add('feedback-correct');
            } else {
                scamFeedback.textContent = "Not quite. This one looks like a legitimate service reminder. The other message uses tell-tale scam tactics.";
                scamFeedback.classList.add('feedback-incorrect');
            }
        });
    });

    const quizForm = document.getElementById('quiz-form');
    const quizResults = document.getElementById('quiz-results');
    const scoreText = document.getElementById('score-text');
    const motivationalMessage = document.getElementById('motivational-message');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const correctAnswers = ['a', 'b', 'b'];

    quizForm.addEventListener('submit', e => {
        e.preventDefault();
        let score = 0;
        const userAnswers = [];
        for (let i = 1; i <= correctAnswers.length; i++) {
            const selected = quizForm.querySelector(`input[name="q${i}"]:checked`);
            if (selected) userAnswers.push(selected.value);
        }
        userAnswers.forEach((answer, index) => {
            if (answer === correctAnswers[index]) score++;
        });
        scoreText.textContent = `You scored ${score} out of ${correctAnswers.length}!`;
        if (score === correctAnswers.length) {
            motivationalMessage.textContent = "Perfect score! You're a true crypto expert!";
        } else if (score >= correctAnswers.length / 2) {
            motivationalMessage.textContent = "Great job! You have a solid foundation.";
        } else {
            motivationalMessage.textContent = "Good start! Review the materials and try again.";
        }
        quizResults.classList.remove('hidden');
        quizForm.style.display = 'none';
        quizResults.scrollIntoView({ behavior: 'smooth' });
    });

    restartQuizBtn.addEventListener('click', () => {
        quizResults.classList.add('hidden');
        quizForm.style.display = 'block';
        quizForm.reset();
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your feedback!');
        contactForm.reset();
    });
});