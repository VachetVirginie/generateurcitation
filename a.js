let listQuotes = [
    { quote: "Dans la vie on ne fait pas ce que l'on veut mais on est responsable de ce que l'on est.", author: "Jean Paul Sartre" },
    { quote: "La vie, c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre.", author: "Albert Einstein" },
    { quote: "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.", author: "Bernard M. Baruch" },
    { quote: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
    { quote: "Choisissez un travail que vous aimez et vous n'aurez pas à travailler un seul jour de votre vie.", author: "Confucius" },
    { quote: "Je connais mes limites. C'est pourquoi je vais au-delà.", author: "Serge Gainsbourg" },
    { quote: "Le seul mauvais choix est l'absence de choix.", author: "Amélie Nothomb" },
    { quote: "Ce n'est pas dans la science qu'est le bonheur, mais dans l'acquisition de la science.", author: "Edgar Allan Poe" },
    { quote: "Ce n'est pas le doute, c'est la certitude qui rend fou..", author: "Friedrich Nietzsche" },
    { quote: "Ceux qui rêvent éveillés ont conscience de mille choses qui échappent à ceux qui ne rêvent qu'endormis.", author: "Edgar Allan Poe" },
    { quote: "Etre libre, ce n'est pas pouvoir faire ce que l'on veut, mais c'est vouloir ce que l'on peut.", author: "Jean Paul Sartre" }
];

let currentQuote = 0;
let progress = setInterval(timerProgress, 40);
let progressWidth = 0;

// let timeDisplayed = 10000;
// let timer = setInterval(changeQuote, timeDisplayed);

function timerProgress() {
    $(".quote-progress").width(progressWidth + "%");
    if (progressWidth < 100) {
        progressWidth += 0.1;
    } else {
        changeQuote();
        progressWidth = 0;
    }
}

function setQuote() {
    $(".quote").html('"' + listQuotes[currentQuote].quote + '"');
    $(".author-name").html(listQuotes[currentQuote].author);
    tweetQuote();
}

function getRandomQuote() {
    currentQuote = Math.round(Math.random() * (listQuotes.length));
    setQuote();
}

function changeQuote() {
    // $("blockquote").fadeToggle( "slow", "linear" );
    if (currentQuote < listQuotes.length - 1) {
        currentQuote++;
    } else {
        currentQuote = 0;
    }
    setQuote();
}

$(".previous").click(function() {
    if (currentQuote > 0) {
        currentQuote--;
    } else {
        currentQuote = listQuotes.length - 1;
    }
    setQuote();
    progressWidth = 0;
});

$(".next").click(function() {
    changeQuote();
    progressWidth = 0;
});

$(".random").click(function() {
    getRandomQuote();
    progressWidth = 0;
});

/* Twitter API */
window.twttr = (function(d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

function tweetQuote() {
    $('#quote-tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=quote,inspiration&text=' + encodeURIComponent('"' + listQuotes[currentQuote].quote + '" ' + listQuotes[currentQuote].author));
}

setQuote();