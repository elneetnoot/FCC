function raiseDigitNumberError() {
    console.error("Too many digits");
}
function raiseZeroError() {
    console.error("Double Zeroes");
}
function raiseCommaError() {
    console.error("More than one comma sign")
}

// Default state for calculator
const DEFAULTSTATE = {currentVal: "0",
                      prevVal: "0",
                      formula: "",
                      signum: "pos",
                      lastClicked: ""}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = DEFAULTSTATE;

        this.numberHandler = this.numberHandler.bind(this);
        this.clearHandler = this.clearHandler.bind(this);
        this.operatorHandler = this.operatorHandler.bind(this);
        this.equalsHandler = this.equalsHandler.bind(this);
    }
    clearHandler() {
        this.setState(DEFAULTSTATE);
    }
    numberHandler(e) {
        const curr = this.state.currentVal;
        const targ = e.target.value;
	
	    // Check for too many digits, double comma signs and remove starting zero if necessary
        curr.length > 19 ? raiseDigitNumberError()
        : targ === "0" && curr === "0" ? raiseZeroError() 
        : (curr?.match(/\./g)?.length ?? 0) >= 1 && targ === "." ? raiseCommaError()
        : (curr?.match(/\./g)?.length ?? 0) == 0 && targ !== "." && curr.startsWith("0") 
            ? this.setState({
                currentVal: (curr + targ).slice(1),
                prevVal: targ,
                formula: this.state.formula + targ,
                lastClicked: "num"
            })
            : this.setState({
                currentVal: curr + targ,
                prevVal: targ,
                formula: this.state.formula + targ,
                lastClicked: "num"
            })
    }
    operatorHandler(e) {
	    // Add operator to formula
        const targ = e.target.value;
        this.setState({
            currentVal: "0",
            prevVal: targ,
            formula: this.state.formula + targ,
            lastClicked: targ
        })        
    }
    equalsHandler() {
	    // Filter out double operators and calculate final, set formula to sum for further calculations
        const filtered = this.state.formula.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');
        const sum = eval(filtered);
        this.setState({
            currentVal: sum,
            formula: sum
        })
    }

    

    render() {
	    // Render a table including a display and four rows of number & operator buttons
        return (
            <table id="calculator">
                <div id="display">{this.state.currentVal}</div>
                <tr>
                    <button id="clear" onClick={this.clearHandler}  class="calcbutton">CE</button>
                    {/*<button id="sqrt">√</button>*/}
                </tr>
                
                <tr>
                    <button id="seven" value="7" onClick={this.numberHandler} class="calcbutton">7</button>
                    <button id="eight" value="8" onClick={this.numberHandler} class="calcbutton">8</button>
                    <button id="nine" value="9" onClick={this.numberHandler} class="calcbutton">9</button>
                    <button id="divide" value="/" onClick={this.operatorHandler} class="calcbutton">÷</button> 
                </tr>
                <tr>
                    <button id="four" value="4" onClick={this.numberHandler} class="calcbutton">4</button>
                    <button id="five" value="5" onClick={this.numberHandler} class="calcbutton">5</button>
                    <button id="six" value="6" onClick={this.numberHandler} class="calcbutton">6</button>
                    <button id="multiply" value="*" onClick={this.operatorHandler} class="calcbutton">*</button> 
                </tr>
                <tr>
                    <button id="one" value="1" onClick={this.numberHandler} class="calcbutton">1</button>
                    <button id="two" value="2" onClick={this.numberHandler} class="calcbutton">2</button>
                    <button id="three" value="3" onClick={this.numberHandler} class="calcbutton">3</button>
                    <button id="subtract" value="-" onClick={this.operatorHandler} class="calcbutton">-</button> 
                </tr>
                <tr>
                    <button id="decimal" value="." onClick={this.numberHandler} class="calcbutton">.</button>
                    <button id="zero" value="0" onClick={this.numberHandler} class="calcbutton">0</button>
                    <button id="add" value="+" onClick={this.operatorHandler} class="calcbutton">+</button>
                    <button id="equals" onClick={this.equalsHandler} class="calcbutton">=</button> 
                </tr>
            </table>
        )
    }
}
// Render app to div id="app"
ReactDOM.render(<App/>, document.getElementById("app"))
