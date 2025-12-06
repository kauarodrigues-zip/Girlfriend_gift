document.addEventListener("DOMContentLoaded", () => {
    const openGiftBtn = document.getElementById("openGiftBtn");
    const landing = document.getElementById("landing");
    const mainContent = document.getElementById("mainContent");

    if (openGiftBtn) {
        openGiftBtn.addEventListener("click", () => {
            landing.classList.add("hidden");
            mainContent.classList.add("visible");
        });
    }

    startElapsedTimer();
});

/**
 * Inicia o contador de quanto tempo passou desde o pedido de namoro.
 */
function startElapsedTimer() {
    // TODO: AJUSTE A DATA (E HORA) REAL DO PEDIDO DE NAMORO
    // new Date(ANO, MES-1, DIA, HORA, MINUTO, SEGUNDO)
    // Exemplo: 10/03/2023 às 20:30 -> new Date(2023, 2, 10, 20, 30, 0);
    const startDate = new Date(2022, 10 - 1, 30, 22, 0, 0);

    const yearsSpan = document.getElementById("elapsedYears");
    const monthsSpan = document.getElementById("elapsedMonths");
    const daysSpan = document.getElementById("elapsedDays");
    const hoursSpan = document.getElementById("elapsedHours");
    const minutesSpan = document.getElementById("elapsedMinutes");
    const secondsSpan = document.getElementById("elapsedSeconds");

    function update() {
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        // Ajuste de segundos/minutos/horas negativos
        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--;
        }

        // Ajuste de dias/meses com base no calendário
        if (days < 0) {
            const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += prevMonthLastDay;
            months--;
        }

        if (months < 0) {
            months += 12;
            years--;
        }

        if (yearsSpan) yearsSpan.textContent = years;
        if (monthsSpan) monthsSpan.textContent = months;
        if (daysSpan) daysSpan.textContent = days;
        if (hoursSpan) hoursSpan.textContent = pad2(hours);
        if (minutesSpan) minutesSpan.textContent = pad2(minutes);
        if (secondsSpan) secondsSpan.textContent = pad2(seconds);
    }

    update();               // primeira atualização imediata
    setInterval(update, 1000); // atualiza a cada segundo
}

function pad2(num) {
    return String(num).padStart(2, "0");
}
