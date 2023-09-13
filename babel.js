const QUOTES = [
    ["“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”", "Albert Einstein"],
    ["“You only live once, but if you do it right, once is enough.”", "Mae West"],
    ["“Be the change that you wish to see in the world”", "Mahatma Gandhi"],
    ["“In three words I can sum up everything I've learned about life: it goes on.”", "Robert Frost"],
    ["“If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.”", "JK Rowling"],
    ["“If you tell the truth, you don't have to remember anything.”", "Mark Twain"],
    ["“I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.”", "Maya Angelou"],
    ["“A friend is someone who knows all about you and still loves you.”", "Elbert Hubbard"]
]

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}
function getRandomQuote() {
    const randQuote = QUOTES[getRandomInt(0, QUOTES.length - 1)]
    return {text: randQuote[0], author: randQuote[1]}
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = getRandomQuote();
    }
    submitHandler() {
        this.setState(getRandomQuote())
    }
    render() {
        return(
        <div id="quote-box" class="container-fluid">
            <h2 id="text">{this.state.text}</h2>
            <h3 id="author">- {this.state.author}</h3>
            <div class="row" id="buttons">
                <button onClick={this.submitHandler.bind(this)} id="new-quote">New Quote</button>
                <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank"><img src="https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/images/Twitter_logo_blue_32.png"></img>Tweet</a>
            </div>
            
        </div>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById('app'))
