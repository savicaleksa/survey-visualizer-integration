import Header from './components/header'
import { ApiDataProvider } from './hooks/use-api-data'

function App() {
  return (
    <ApiDataProvider>
      <Header />
    </ApiDataProvider>
  )
}

export default App
