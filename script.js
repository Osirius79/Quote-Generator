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

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    //'https://thingproxy.freeboard.io/fetch/';
    //'https://cors-anywhere.herokuapp.com/';
    

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=get&land=en&format=json';
    try {
        const response = await fetch(proxyUrl +  apiUrl);
        const data = await response.json();
        authorText.innerHTML = data.authorText === '' 
        ?  "Unknown" 
        : data.quoteAuthor;
        data.quoteText.length > 120 
        ? quoteText.classList.add('long-quote')
        :quoteText.classList.remove('long-quote');
        
        quoteText.innerHTML = data.quoteText;
        removeLoadingSpinner();
    } catch (error) {
        // getQuote(); 
        removeLoadingSpinner(); //Added as API forismatic doesn't send response

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
