const SPOTIFY_LOGIN_URL = 'http://localhost:8888/login'

function App() {
  return (
    <div >
      <a
        href={SPOTIFY_LOGIN_URL}
      >
        Login with spotify
      </a>
    </div>
  );
}

export default App;
