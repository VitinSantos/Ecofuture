// DADOS DO USUARIO (VARIAVEIS GLOBAIS SIMPLES)
var xpTotal = 340;
var diasOfensiva = 39; 
var nivelAtual = 2;   
var nomeCursoAtivo = "Matemática Verde";

// FUNCAO SIMPLES DE ALTERNANCIA DE ABAS
function switchTab(tabName) {
    // Pegando todas as abas e escondendo
    var tabs = document.querySelectorAll('.app-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Removendo selecao de todos os botoes
    var menuItems = document.querySelectorAll('.menu-item');
    for (var j = 0; j < menuItems.length; j++) {
        menuItems[j].classList.remove('active');
    }

    // Ativando a aba clicada e o seu botao correspondente
    var targetTab = document.getElementById('tab-' + tabName);
    var targetBtn = document.getElementById('btn-' + tabName);
    
    if (targetTab) targetTab.classList.add('active');
    if (targetBtn) targetBtn.classList.add('active');
}

// FUNCAO PARA SELECIONAR TRILHA DE CURSO (REESTRUTURADA E BLINDADA)
function selectCourse(courseName, videoUrl, description) {
    nomeCursoAtivo = courseName;
    
    // 1. Atualiza IMEDIATAMENTE o vídeo e os textos da aba Aprender
    if (document.getElementById('currentCourseTitle')) document.getElementById('currentCourseTitle').innerText = courseName;
    if (document.getElementById('lessonTitle')) document.getElementById('lessonTitle').innerText = courseName + ": Introdução Básica";
    if (document.getElementById('lessonDesc')) document.getElementById('lessonDesc').innerText = description;
    
    var videoIframe = document.getElementById('lessonVideo');
    if (videoIframe) {
        // Adicionando ?autoplay=1 para o vídeo começar a tocar sozinho ao clicar!
        videoIframe.src = videoUrl + "?autoplay=1";
    }
    
    // 2. Redireciona na hora para a aba Aprender
    switchTab('aprender');
    
    // 3. Roda o painel em segundo plano sem chance de travar o clique
    try {
        updateDashboardUI();
    } catch (e) {
        console.log("Aviso de interface: ", e.message);
    }
}

// FUNCAO DE CONCLUIR EXERCICIO / VIDEO
function completeLesson() {
    xpTotal = xpTotal + 120;
    
    // Modificando barras de progresso na aba de missoes
    if (document.getElementById('missaoBarFill')) document.getElementById('missaoBarFill').style.width = "100%";
    if (document.getElementById('missaoXpText')) document.getElementById('missaoXpText').innerText = "20 / 20 XP";
    if (document.getElementById('missaoLessonFill')) document.getElementById('missaoLessonFill').style.width = "100%";
    if (document.getElementById('missaoLessonText')) document.getElementById('missaoLessonText').innerText = "1 / 1";

    // Verificacao de Subida de Nivel Basica
    if (xpTotal >= 500 && nivelAtual < 3) {
        nivelAtual = 3;
        alert("Parabéns! Você subiu para o Nível 3!");
    }

    // Destrava conquista caso termine o curso de TI
    if (nomeCursoAtivo === "TI Sustentável") {
        var badgeTech = document.getElementById('badgeTech');
        if (badgeTech) {
            badgeTech.classList.remove('locked');
        }
    }

    try {
        updateDashboardUI();
    } catch (e) {
        console.log(e);
    }
}

// ATUALIZADOR PROTEGIDO (Não trava se o elemento não existir na tela)
function updateDashboardUI() {
    var elXp = document.getElementById('userXpTotal');
    var elLvl = document.getElementById('userLevel');
    var elStr = document.getElementById('userStreak');
    
    if (elXp) elXp.innerText = xpTotal;
    if (elLvl) elLvl.innerText = nivelAtual;
    if (elStr) elStr.innerText = diasOfensiva;
}

// DETECTOR DE EVENTO PARA SELETOR DE MODO CLARO E ESCURO
document.addEventListener("DOMContentLoaded", function() {
    var themeCheck = document.getElementById('themeToggleCheck');
    if (themeCheck) {
        themeCheck.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        });
    }
    updateDashboardUI();
});

window.onload = function() {
    try {
        updateDashboardUI();
    } catch (e) {}
};