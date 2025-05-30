document.addEventListener('DOMContentLoaded', () => {
    const loginInput = document.getElementById('login-input');
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-button');
    const feedbackElement = document.getElementById('feedback');
    const togglePasswordButton = document.getElementById('toggle-password-visibility');

    const correctLogin = "dmVyaXNzaW1v"; 
    const correctPassword = "cmFpb3NmdW5kZWxvbWJh"; 
    const nextPageUrl = 'finalobrigadoae.html';

    function normalizeInput(text) {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '')             
            .toLowerCase();                  
    } 

    function handleLoginAttempt() {
        const enteredLoginRaw = loginInput.value.trim();
        const enteredPasswordRaw = passwordInput.value.trim();
        const normalizedEnteredLogin = normalizeInput(enteredLoginRaw);
        const base64EnteredLogin = btoa(normalizedEnteredLogin)
        const normalizedEnteredPassword = normalizeInput(enteredPasswordRaw);
        const base64EnteredPassword = btoa(normalizedEnteredPassword);

        if (base64EnteredLogin === correctLogin && base64EnteredPassword === correctPassword) {
            feedbackElement.textContent = 'Login bem-sucedido! Redirecionando...';
            feedbackElement.style.color = 'green';
            setTimeout(() => {
                window.location.href = nextPageUrl;
            }, 1000);
        } else {
            feedbackElement.textContent = 'Login ou senha incorretos. Tente novamente.';
            feedbackElement.style.color = 'red';
            passwordInput.value = '';
            loginInput.focus();
        }
    }

    if (submitButton) {
        submitButton.addEventListener('click', handleLoginAttempt);
    }

    [loginInput, passwordInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    handleLoginAttempt();
                }
            });
        }
    });

    if (togglePasswordButton && passwordInput) {
        togglePasswordButton.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordButton.textContent = type === 'password' ? 'Ver' : 'Ocultar';
        });
    }
});