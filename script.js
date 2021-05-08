var apiQuotes = [];
var quote;
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// New quote
function newQuote () {
    showLoadingSpinner();
    quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    authorText.innerHTML = !quote.author ?  "Unknown" : quote.author;
    quote.text.length > 120 ? quoteText.classList.add('long-quote'):quoteText.classList.remove('long-quote');
    quoteText.innerHTML = quote.text;
    removeLoadingSpinner();
}

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        newQuote();
    }
}

//Tweeet Quote
function tweetQuote() {
   const quote = quoteText.innerText;
   const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}


// On Load
getQuote();

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);




console.log()
