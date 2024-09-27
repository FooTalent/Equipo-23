document.getElementById('verification-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const verificationCode = document.getElementById('verification-code').value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('/api/sessions/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: verificationCode,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            messageElement.innerHTML = `<span style="color: green;"><br>Registro completo. Por favor, espere...</span>`;
            setTimeout(() => {
                window.location.href = "/";
            }, 3000); 
        } else {
            messageElement.textContent = data.message;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'Ocurrió un error al verificar el código.';
        messageElement.style.color = 'red';
    }
});