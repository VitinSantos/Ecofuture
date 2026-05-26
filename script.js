var xpTotal = 340;
var diasOfensiva = 39;
var nivelAtual = 2;
var nomeCursoAtivo = "Matemática Verde";

function switchTab(tabName) {
    var tabs = document.querySelectorAll('.app-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    var menuItems = document.querySelectorAll('.menu-item');
    for (var j = 0; j < menuItems.length; j++) {
        menuItems[j].classList.remove('active');
    }

    var targetTab = document.getElementById('tab-' + tabName);
    var targetBtn = document.getElementById('btn-' + tabName);

    if (targetTab) targetTab.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');
}

function selectCourse(courseName, videoUrl, description) {
    nomeCursoAtivo = courseName;

    document.getElementById('currentCourseTitle').innerText = courseName;
    document.getElementById('lessonTitle').innerText = courseName + ": Introdução Básica";
    document.getElementById('lessonDesc').innerText = description;

    var videoIframe = document.getElementById('lessonVideo');

    if (videoIframe) {
        // 🔥 FORÇA RELOAD DO VÍDEO (resolve bug de não carregar)
        videoIframe.src = "";

        setTimeout(function () {
            videoIframe.src = videoUrl + "?autoplay=1&rel=0";
        }, 50);
    }

    switchTab('aprender');

    try {
        updateDashboardUI();
    } catch (e) {
        console.log(e);
    }
}

function completeLesson() {
    xpTotal += 120;

    document.getElementById('missaoBarFill').style.width = "100%";
    document.getElementById('missaoXpText').innerText = "20 / 20 XP";
    document.getElementById('missaoLessonFill').style.width = "100%";
    document.getElementById('missaoLessonText').innerText = "1 / 1";

    if (xpTotal >= 500 && nivelAtual < 3) {
        nivelAtual = 3;
        alert("Parabéns! Você subiu para o Nível 3!");
    }

    if (nomeCursoAtivo === "TI Sustentável") {
        document.getElementById('badgeTech').classList.remove('locked');
    }

    updateDashboardUI();
}

function updateDashboardUI() {
    document.getElementById('userXpTotal').innerText = xpTotal;
    document.getElementById('userLevel').innerText = nivelAtual;
    document.getElementById('userStreak').innerText = diasOfensiva;
}

document.addEventListener("DOMContentLoaded", function () {
    var themeCheck = document.getElementById('themeToggleCheck');

    themeCheck.addEventListener('change', function () {
        document.documentElement.setAttribute(
            'data-theme',
            this.checked ? 'light' : 'dark'
        );
    });

    updateDashboardUI();
});

window.onload = function () {
    updateDashboardUI();
};