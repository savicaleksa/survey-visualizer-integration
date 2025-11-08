import CategoryList from './components/category-list'
import Header from './components/header'
import { ApiDataProvider } from './hooks/use-api-data'

function App() {
  return (
    <ApiDataProvider>
      <Header />
      <CategoryList />
    </ApiDataProvider>
  )
}

export default App
