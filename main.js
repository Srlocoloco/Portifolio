// Efeito de digitação para a seção hero
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema salvo imediatamente
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.classList.add(savedTheme + '-theme');
    
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const phrases = [
            "Desenvolvedor Full Stack",
            "Especialista em Java",
            "Criador de Experiências Web",
            "Solucionador de Problemas"
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pausa antes de começar a apagar
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pausa antes de começar a próxima frase
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Iniciar o efeito de digitação
        typeText();
    }
    
    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Toggle para o menu mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Implementação do alternador de tema (claro/escuro)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Definir o estado inicial do botão com base no tema atual
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        themeToggle.checked = currentTheme === 'light';
        
        // Adicionar evento de mudança
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
            }
        });
    }
});

// Função para criar o botão de alternância de tema se não existir
function createThemeToggle() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const themeToggleContainer = document.createElement('div');
    themeToggleContainer.className = 'theme-toggle-container';
    
    themeToggleContainer.innerHTML = `
        <label class="theme-switch" for="theme-toggle">
            <input type="checkbox" id="theme-toggle">
            <span class="slider round">
                <i class="fas fa-sun"></i>
                <i class="fas fa-moon"></i>
            </span>
        </label>
    `;
    
    // Adicionar ao header, antes do último elemento (geralmente o botão de menu mobile)
    const lastChild = header.lastElementChild;
    if (lastChild) {
        header.insertBefore(themeToggleContainer, lastChild);
    } else {
        header.appendChild(themeToggleContainer);
    }
    
    // Configurar o novo botão
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        setupThemeToggle(themeToggle);
    }
}

// Configurar o comportamento do botão de tema
function setupThemeToggle(themeToggle) {
    // Verificar tema atual
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    themeToggle.checked = currentTheme === 'light';
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}