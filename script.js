const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
// const loader = document.getElementById('loader'); 

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}



function newQuote() {
    const quote = localQuote[Math.floor(Math.random() * localQuote.length)];
    if (quote.author === '') {
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = quote.author;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = quote.text;
}

async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length > 0) {
            const quote = data[Math.floor(Math.random() * data.length)];
            const quoteAuthor = quote.author || 'Unknown';
            const quoteTextContent = quote.text || 'No quote available';

            if (quoteTextContent.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            }

            authorText.textContent = quoteAuthor;
            quoteText.textContent = quoteTextContent;

            complete();
        } else {
            throw new Error('Empty response from the API');
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        getQuote(); // Retry fetching quote on error
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
newQuote();
