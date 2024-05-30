const App: React.FC = () => (
  <iframe src={import.meta.env.VITE_CLIENT_URL} style={{width: '100vw', height: '100vh', border: 'none'}}/>
);

export default App;
