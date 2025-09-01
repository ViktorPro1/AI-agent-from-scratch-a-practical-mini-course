// Плавний скрол до секції "Програма навчання"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});


// Спливаюче вікно пожертви

document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("donation-popup");
    const donateBtn = document.getElementById("donate-btn");
    const declineBtn = document.getElementById("decline-btn");

    const now = new Date().getTime(); // поточний час у мс
    const firstVisit = localStorage.getItem("firstVisitTimestamp");
    const lastDecline = localStorage.getItem("donationPopupDeclined");

    // Зберігаємо дату першого відвідування
    if (!firstVisit) {
        localStorage.setItem("firstVisitTimestamp", now);
    }

    const twoDays = 2 * 24 * 60 * 60 * 1000; // 2 дні
    const thirtyDays = 30 * 24 * 60 * 60 * 1000; // 30 днів

    let showPopup = false;

    // Перевірка, чи треба показати вікно
    if (lastDecline) {
        // Якщо користувач відхилив раніше, показуємо тільки через 30 днів
        if (now - lastDecline >= thirtyDays) {
            showPopup = true;
        }
    } else {
        // Вперше або ще не відхилив: показуємо через 2 дні від першого візиту
        if (now - (firstVisit || now) >= twoDays) {
            showPopup = true;
        }
    }

    if (showPopup) {
        popup.style.display = "flex";
    }

    declineBtn.addEventListener("click", () => {
        popup.style.display = "none";
        localStorage.setItem("donationPopupDeclined", now);
    });

    donateBtn.addEventListener("click", () => {
        localStorage.setItem("donationPopupDeclined", now); // щоб не показувалося відразу
        window.location.href = "https://www.privat24.ua/send/3b4vk";
    });
});


