document.addEventListener('DOMContentLoaded', () => {
    // --- DEFINA SEUS ENIGMAS AQUI ---
    const enigmas = [
        {
            encodedAnswer: "b2RpYXF1ZXRvZG9zYWd1YXJkYW1vcw==", // "odiaquetodosaguardamos" em Base64
            nextUrl: "odiaquetodosaguardamos.html"
        },
        {
            encodedAnswer: "dW11bHRpbW9hZGV1cw==", // "umultimoadeus" em Base64
            nextUrl: "umultimoadeus.html" // Página para "Um Ultimo Adeus"
        },
        {
            encodedAnswer: "ZWNhZg==", // "ecaf" em Base64
            nextUrl: "ecaf.html" // Página para "E C A F"
        },
        {
            encodedAnswer: "dGFtYm9yaWw=", // "tamboril" em Base64
            nextUrl: "tamboril.html" // Página para "Tamboril"
        },
        {
            encodedAnswer: "bHVjaWZlcg==", // "lucifer" em Base64
            nextUrl: "luciferinside.html" // Página para "Tamboril"
        },
        {
            encodedAnswer: "aG9yZGFz", // "hordas" em Base64
            nextUrl: "hordas.html" // Página para "Tamboril"
        },
        {
            encodedAnswer: "bmlkZXJl", // "nidere" em Base64
            nextUrl: "nidere.html" // Página para "Tamboril"
        },
        {
            encodedAnswer: "dW50aWx0aGVu", // "untilthen" em Base64
            nextUrl: "codigodefinalizacao.html" 
        },
        {
            encodedAnswer: "Z2FyZmllbGRrYXJ0", // "garfieldkart" em Base64
            nextUrl: "https://x.com/joao_azeve56849/status/1909779523169566848"
        },
        {
            encodedAnswer: "dGV0cmlz", // "tetris" em Base64
            nextUrl: "https://www.twitch.tv/cellbit"
        },
        {
            encodedAnswer: "ZW5pZ21hZG9tZWRv", // "enigmadomedo" em Base64
            nextUrl: "https://store.steampowered.com/app/1507580/Enigma_do_Medo/?l=brazilian"
        },
        {
            encodedAnswer: "MTYzNzRfMzUyNg==", // "16374_3526" em Base64
            nextUrl: "16374_3526.html"
        },
        {
            encodedAnswer: "MDUyNjNfMjQxNQ==", // "05263_2415" em Base64
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

    function checkAnswer() { // Não é mais async
        if (enigmas.length === 0) return;

        const userAnswerRaw = answerInputElement.value;
        const normalizedUserAnswer = normalizeAnswer(userAnswerRaw);

        if (!normalizedUserAnswer) {
            feedbackElement.textContent = 'Tá esquecendo de nada não?';
            feedbackElement.style.color = '#e74c3c'; // Cor de aviso
            answerInputElement.focus();
            return;
        }

        const base64UserAnswer = btoa(normalizedUserAnswer); // Codifica a resposta do usuário em Base64
        let enigmaFound = false;

        for (const enigma of enigmas) {
            // A propriedade no seu enigma já era 'encodedAnswer', o que é bom.
            // Apenas garantimos que o valor armazenado é Base64 e a comparação é com a resposta do usuário codificada em Base64.
            if (base64UserAnswer === enigma.encodedAnswer) {
                feedbackElement.textContent = '';
                feedbackElement.style.color = '#2ecc71'; // Verde
                answerInputElement.classList.remove('error-input');

                if (errorResetTimeoutId) {
                    clearTimeout(errorResetTimeoutId);
                    errorResetTimeoutId = null;
                }


                setTimeout(() => {
                    window.open(enigma.nextUrl, '_blank');
                    answerInputElement.value = '';
                    answerInputElement.focus();
                    // A mensagem "Boa!" permanecerá até a próxima tentativa ou erro.
                });
                enigmaFound = true;
                break;
            }
        }

        if (!enigmaFound) {
            feedbackElement.textContent = 'Não tens o que é necessário?';
            feedbackElement.style.color = '#ff1200'; // Vermelho
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