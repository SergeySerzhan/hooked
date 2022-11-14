type HeaderProps = {
  text: string;
}

function Header (props: HeaderProps): JSX.Element  {
  return (
      <header className="App-header">
        <h2>{props.text}</h2>
      </header>
  )
}

export default Header;
