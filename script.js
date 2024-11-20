const story = {
    start: {
        text: "É 8 de fevereiro de 2009, e você, Taylor Swift, está se preparando para a sua primeira grande noite no Grammy. Você está indicada a Melhor Performance Vocal Feminina de Country por 'White Horse'. O que você faz primeiro?",
        options: [
            { text: "Escolher um vestido deslumbrante", next: "choose_dress" },
            { text: "Ensaiar seu discurso caso vença", next: "practice_speech" }
        ]
    },
    choose_dress: {
        text: "Você escolhe um vestido longo azul que chama atenção no tapete vermelho. Durante a entrevista, te perguntam sobre seus planos para o futuro. O que você responde?",
        options: [
            { text: "Focar no próximo álbum", next: "focus_album" },
            { text: "Falar sobre a importância da música country", next: "talk_country" }
        ]
    },
    practice_speech: {
        text: "Você passa um bom tempo ensaiando seu discurso. A cerimônia começa, e você está nervosa. Quando o apresentador chama seu nome como vencedora, o que você faz?",
        options: [
            { text: "Agradecer à equipe e aos fãs", next: "thank_team" },
            { text: "Fazer um discurso emocionante sobre perseverança", next: "speech_perseverance" }
        ]
    },
    focus_album: {
        text: "Você menciona que está trabalhando no próximo álbum. Os jornalistas ficam curiosos. Durante a cerimônia, você é abordada por um produtor famoso que quer colaborar com você. O que você faz?",
        options: [
            { text: "Aceitar a proposta", next: "accept_collaboration" },
            { text: "Manter seu estilo independente", next: "stay_independent" }
        ]
    },
    talk_country: {
        text: "Você fala apaixonadamente sobre a música country, ganhando aplausos. Mais tarde, um repórter menciona que você pode ser a próxima grande estrela do gênero. Fim da jornada!",
        options: [],
        end: true
    },
    thank_team: {
        text: "Você agradece à equipe e aos fãs, emocionando o público. Ao descer do palco, você percebe que sua carreira está apenas começando. Fim da jornada!",
        options: [],
        end: true
    },
    speech_perseverance: {
        text: "Seu discurso sobre perseverança inspira muitos artistas jovens presentes. Você sai da cerimônia com convites para várias entrevistas. Fim da jornada!",
        options: [],
        end: true
    },
    accept_collaboration: {
        text: "A colaboração rende um grande hit, mas você sente que perdeu um pouco da sua essência. Isso te faz refletir sobre seus próximos passos. Fim da jornada!",
        options: [],
        end: true
    },
    stay_independent: {
        text: "Você decide manter seu estilo único, ganhando respeito na indústria. Isso se reflete no sucesso estrondoso do seu próximo álbum. Fim da jornada!",
        options: [],
        end: true
    }
};

function saveProgress(step) {
    localStorage.setItem("currentStep", step);
}

function loadProgress() {
    return localStorage.getItem("currentStep") || "start";
}

function renderStep(step) {
    const app = document.getElementById("app");
    const current = story[step];
    saveProgress(step);

    app.innerHTML = "";

    const text = document.createElement("p");
    text.innerText = current.text;
    app.appendChild(text);

    if (current.options && current.options.length > 0) {
        current.options.forEach(option => {
            const link = document.createElement("a");
            link.innerText = option.text;
            link.href = "#";
            link.style.display = "block";
            link.addEventListener("click", () => renderStep(option.next));
            app.appendChild(link);
        });
    } else if (current.end) {
        const endText = document.createElement("p");
        endText.innerText = "Você chegou ao fim da jornada!";
        app.appendChild(endText);

        const restartLink = document.createElement("a");
        restartLink.innerText = "Recomeçar";
        restartLink.href = "#";
        restartLink.addEventListener("click", () => {
            localStorage.removeItem("currentStep");
            renderStep("start");
        });
        app.appendChild(restartLink);
    }
}

window.addEventListener("load", () => {
    const currentStep = loadProgress();
    renderStep(currentStep);
});
