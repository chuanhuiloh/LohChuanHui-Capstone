import icon from './assets/icon.png'
import "./StockStyling.css"

function Header(props) {
    return (
      <header className="header-container">
        <img src={icon} alt="Icon"/>
        <h1>{props.title}</h1>
      </header>
    )
}

export default Header;