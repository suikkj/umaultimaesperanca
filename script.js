document.addEventListener('DOMContentLoaded', () => {
    const enigmas = [
        {
            encodedAnswer: "b2RpYXF1ZXRvZG9zYWd1YXJkYW1vcw==", 
            nextUrl: "odiaquetodosaguardamos.html"
        },
        {
            encodedAnswer: "dW11bHRpbW9hZGV1cw==", 
            nextUrl: "umultimoadeus.html" 
        },
        {
            encodedAnswer: "ZWNhZg==", 
            nextUrl: "ecaf.html" 
        },
        {
            encodedAnswer: "dGFtYm9yaWw=", 
            nextUrl: "tamboril.html" 
        },
        {
            encodedAnswer: "bHVjaWZlcg==", 
            nextUrl: "luciferinside.html" 
        },
        {
            encodedAnswer: "aG9yZGFz", 
            nextUrl: "hordas.html" 
        },
        {
            encodedAnswer: "bmlkZXJl", 
            nextUrl: "nidere.html" 
        },
        {
            encodedAnswer: "dW50aWx0aGVu", 
            nextUrl: "codigodefinalizacao.html" 
        },
        {
            encodedAnswer: "Z2FyZmllbGRrYXJ0", 
            nextUrl: "https://x.com/joao_azeve56849/status/1909779523169566848"
        },
        {
            encodedAnswer: "dGV0cmlz", 
            nextUrl: "https://www.twitch.tv/cellbit"
        },
        {
            encodedAnswer: "ZW5pZ21hZG9tZWRv", 
            nextUrl: "https://store.steampowered.com/app/1507580/Enigma_do_Medo/?l=brazilian"
        },
        {
            encodedAnswer: "MTYzNzRfMzUyNg==", 
            nextUrl: "16374_3526.html"
        },
        {
            encodedAnswer: "MDUyNjNfMjQxNQ==", 
            nextUrl: "05263_2415.html"
        }
    ];
    // ---------------------------------

    let errorResetTimeoutId = null;

    const answerInputElement = document.getElementById('answer-input');
    const submitButton = document.getElementById('submit-button');
    const feedbackElement = document.getElementById('feedback');
    const enigmaAreaElement = document.getElementById('enigma-area');

    function loadInterfaceState() {
        if (enigmas.length === 0) {
            enigmaAreaElement.style.display = 'block';
            feedbackElement.textContent = 'Nenhum enigma configurado.';
            answerInputElement.disabled = true;
            submitButton.disabled = true;
            return;
        }

        enigmaAreaElement.style.display = 'block';
        answerInputElement.value = '';
        feedbackElement.textContent = '';
        answerInputElement.classList.remove('error-input');
        answerInputElement.disabled = false;
        submitButton.disabled = false;
        answerInputElement.focus();
    }

    function normalizeAnswer(text) {
        return text
            .normalize('NFD') 
            .replace(/[\u0300-\u036f]/g, '') 
            .replace(/\s+/g, '') 
            .toLowerCase();
    }

    function checkAnswer() { 
        if (enigmas.length === 0) return;

        const userAnswerRaw = answerInputElement.value;
        const normalizedUserAnswer = normalizeAnswer(userAnswerRaw);

        if (!normalizedUserAnswer) {
            feedbackElement.textContent = 'Tá esquecendo de nada não?';
            feedbackElement.style.color = '#e74c3c'; 
            answerInputElement.focus();
            return;
        }

        const base64UserAnswer = btoa(normalizedUserAnswer); 
        let enigmaFound = false;

        for (const enigma of enigmas) {
            if (base64UserAnswer === enigma.encodedAnswer) {
                feedbackElement.textContent = '';
                feedbackElement.style.color = '#2ecc71'; 
                answerInputElement.classList.remove('error-input');

                if (errorResetTimeoutId) {
                    clearTimeout(errorResetTimeoutId);
                    errorResetTimeoutId = null;
                }


                setTimeout(() => {
                    window.open(enigma.nextUrl, '_blank');
                    answerInputElement.value = '';
                    answerInputElement.focus();
                    
                });
                enigmaFound = true;
                break;
            }
        }

        if (!enigmaFound) {
            feedbackElement.textContent = 'Não tens o que é necessário?';
            feedbackElement.style.color = '#ff1200'; 
            answerInputElement.classList.add('error-input');
            answerInputElement.classList.add('shake-input');
            answerInputElement.focus();
            answerInputElement.value = '';

            setTimeout(() => {
                answerInputElement.classList.remove('shake-input');
            }, 500);

            if (errorResetTimeoutId) {
                clearTimeout(errorResetTimeoutId);
            }
            errorResetTimeoutId = setTimeout(() => {
                answerInputElement.classList.remove('error-input');
                if (feedbackElement.textContent === 'Não tens o que é necessário?') {
                    feedbackElement.textContent = '';
                }
                errorResetTimeoutId = null;
            }, 3000);
        }
    }

    submitButton.addEventListener('click', checkAnswer);
    answerInputElement.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkAnswer();
        }
    });

    loadInterfaceState();
});