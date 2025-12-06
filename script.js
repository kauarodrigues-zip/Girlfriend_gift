/**
 * Inicia o contador de quanto tempo passou desde o pedido de namoro.
 */
function startElapsedTimer() {
    // 30/10/2022 às 22:00
    // new Date(ANO, MES-1, DIA, HORA, MINUTO, SEGUNDO)
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

    update();                 // primeira atualização imediata
    setInterval(update, 1000); // atualiza a cada segundo
}

function pad2(num) {
    return String(num).padStart(2, "0");
}

function startTypewriter() {
    const el = document.getElementById("typewriter");
    if (!el) return;

    const text = "Feliz aniversário meu amor";
    let i = 0;

    function type() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(type, 60); // velocidade da digitação
        }
    }

    type();
}

document.addEventListener("DOMContentLoaded", () => {
    const openGiftBtn = document.getElementById("openGiftBtn");
    const landing = document.getElementById("landing");
    const mainContent = document.getElementById("mainContent");
    const bgMusic = document.getElementById("bgMusic");

    if (openGiftBtn) {
        openGiftBtn.addEventListener("click", () => {
            // Esconde a tela do presente e mostra o conteúdo
            landing.classList.add("hidden");
            mainContent.classList.add("visible");

            // Inicia o contador e o efeito de digitação
            startElapsedTimer();
            startTypewriter();

            // Toca a música após a interação do usuário
            if (bgMusic) {
                try {
                    bgMusic.volume = 0.6; // ajuste de volume (0.0 a 1.0)
                    bgMusic.play().catch(() => {
                        console.log("Navegador bloqueou autoplay do áudio.");
                    });
                } catch (e) {
                    console.log("Erro ao tentar tocar a música:", e);
                }
            }
        });
    } else {
        // Fallback caso um dia você remova a tela de presente
        startElapsedTimer();
        startTypewriter();

        if (bgMusic) {
            try {
                bgMusic.volume = 0.6;
                bgMusic.play().catch(() => {
                    console.log("Navegador bloqueou autoplay do áudio.");
                });
            } catch (e) {
                console.log("Erro ao tentar tocar a música:", e);
            }
        }
    }
});
