document.addEventListener("DOMContentLoaded", function () {
    const bgValue = document.getElementById('bgcolor');
    const txtValue = document.getElementById('textColor');
    const signBtn = document.getElementById('signBtn');
    const canvas = document.getElementById('signCanvas');
    const wShareBtn = document.getElementById('shareWhatsapp');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Set initial background color
    let bgColor = '#ffffff';
    canvas.style.backgroundColor = bgColor;

    // Set initial text color
    let textColor = txtValue.value;

    ctx.strokeStyle = textColor; // Change to ctx.strokeStyle for line color

    // Update background color on input change
    bgValue.addEventListener('input', function () {
        bgColor = bgValue.value;
        canvas.style.backgroundColor = bgColor;
    });

    // Update text color on input change
    txtValue.addEventListener('input', function () {
        textColor = txtValue.value;
        ctx.strokeStyle = textColor; // Change to ctx.strokeStyle for line color
    });

    // Start drawing
    canvas.addEventListener('mousedown', function (e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    });

    // Continue drawing
    canvas.addEventListener('mousemove', function (e) {
        if (isDrawing) {
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
        }
    });

    // Stop drawing
    canvas.addEventListener('mouseup', function () {
        isDrawing = false;
    });

    // Download signature
    signBtn.addEventListener('click', function () {
        const newCanvas = document.createElement('canvas');
        const newCtx = newCanvas.getContext('2d');

        // Set the dimensions of the new canvas
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;

        // Set the background color of the new canvas
        newCtx.fillStyle = bgColor;
        newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

        // Draw the content of the original canvas onto the new canvas
        newCtx.drawImage(canvas, 0, 0);

        // Convert the new canvas to a data URL
        const newDataURL = newCanvas.toDataURL('image/png');

        // Create a download link for the new data URL
        const a = document.createElement('a');
        a.href = newDataURL;
        a.download = 'digital_signature.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    wShareBtn.addEventListener('click', () => {

    })
});