import '../components/Setter.css';
import Setter from '../components/Setter';
import '../App.css'

function SettingsPage() {
    let round = 5;
    let discussTimer = 30;
    let responseTimer = 30;

return (
    <div className="settings">
        <h1 className="header">SETTINGS</h1>
        <form>
            {/* {original} is the default value for each setting */}
            {/* {value} is the increment/decrement value of the buttons for each setting */}
            <div className="number-of-rounds">
                <h3 className= "subtitle">Number of rounds</h3>
                <Setter original={round} value={1} />               
            </div>
            <div className="response-timer">
                <h3 className= "subtitle">Response Timer (+30sec)</h3>
                <Setter original={responseTimer} value={1}/>               
            </div>
            <div className="discussion-timer">
                <h3 className= "subtitle">Discussion Timer (+30sec)</h3>
                <Setter original={discussTimer} value={1}/>               
            </div>
            <div className="voting-timer">
                <h3 className= "subtitle">Voting Timer (+30sec)</h3>
                <Setter original={round} value={1}/>               
            </div>
            <button className="button" >Save</button>
        </form>
    </div>
    

)

}

export default SettingsPage
