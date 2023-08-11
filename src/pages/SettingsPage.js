// import './SettingsPage.css';
import Setter from '../components/Setter';
import '../App.css'

function SettingsPage() {
return (
    <div className="settings">
        <h1 className="title">SETTINGS</h1>
        <div className="number-of-rounds">
        <h3 className= "subtitle">Number of rounds</h3>
        {/* replace {value} with default */}
        <Setter value="5" />
        </div>
    </div>

)

}

export default SettingsPage
