import CategoryList from './components/category-list'
import ChartsSection from './components/charts/charts-section'
import Footer from './components/footer'
import Header from './components/header'
import QuestionsSection from './components/questions'
import { ApiDataProvider } from './hooks/use-api-data'

function App() {
  return (
    <ApiDataProvider>
      <Header />
      <CategoryList />
      <ChartsSection />
      <CategoryList />
      <QuestionsSection />
      <Footer />
    </ApiDataProvider>
  )
}

export default App
