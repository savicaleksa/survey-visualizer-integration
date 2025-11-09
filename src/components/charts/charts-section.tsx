import { useApiData } from '../../hooks/use-api-data'
import CategoryChart from './category-chart'
import DifficultyChart from './difficulty-chart'

const ChartsSection = () => {
  const { isLoading } = useApiData()
  return (
    <div className="py-12 m-2 bg-gray-900 rounded-lg">
      <div className="container">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 lg:gap-4">
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">
              Categories Distribution
            </h2>
            <div className="aspect-square p-4 max-w-3xl mx-auto bg-gray-800 rounded-lg">
              {!isLoading && <CategoryChart />}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">
              Difficulty Distribution by Selected Category
            </h2>
            <div className="aspect-square max-w-3xl mx-auto bg-gray-800 rounded-lg">
              {!isLoading && <DifficultyChart />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartsSection
