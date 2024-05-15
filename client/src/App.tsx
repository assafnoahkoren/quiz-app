import { observer } from "mobx-react-lite"
import { authStore } from "./stores/AuthStore"

const App = observer(() => {
  
  return (
    <>
      <h1 className="title">
        Hello world!
      </h1>

      <button className="bg-slate-200 border-2 border-slate-300 px-4 rounded" onClick={() => authStore.login('a@a.com', '123123')}>
        Click me!
      </button>

      {authStore.jwt}
      {authStore.isLogged ? 'Logged in' : 'Not logged in'}

    </>
  )
})

export default App
