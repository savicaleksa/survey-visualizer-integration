import CategoryList from './components/category-list'
import ChartsSection from './components/charts/charts-section'
import Header from './components/header'
import { ApiDataProvider } from './hooks/use-api-data'

function App() {
  return (
    <ApiDataProvider>
      <Header />
      <CategoryList />
      <ChartsSection />
    </ApiDataProvider>
  )
}

export default App
