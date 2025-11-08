import { useApiData } from '../hooks/use-api-data'
import { cn } from '../utils/cn'

const CategoryList = () => {
  const { categories, isLoading, selectedCategory, setSelectedCategory } =
    useApiData()

  return (
    <div className="py-12 m-2 rounded-lg bg-gray-900">
      <div className="container">
        <h2 className="text-xl font-bold uppercase mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <LoadingCategoriesList />
          ) : (
            categories.map((c) => {
              const isSelected = c.name === selectedCategory
              return (
                <button
                  className={cn(
                    'rounded-lg py-2 px-4 font-semibold cursor-pointer inline-flex gap-2 items-center',
                    isSelected
                      ? 'bg-pink-500 text-pink-950 hover:bg-pink-400'
                      : 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                  )}
                  key={c.name}
                  onClick={() => setSelectedCategory(c.name)}
                >
                  {c.decodedName}{' '}
                  <span
                    className={cn(
                      'font-bold text-sm',
                      isSelected ? 'opacity-90' : 'opacity-50'
                    )}
                  >
                    {c.count}
                  </span>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

const LoadingCategoriesList = () => {
  const randomWidthClasses = [
    'w-16',
    'w-20',
    'w-24',
    'w-28',
    'w-32',
    'w-36',
    'w-40',
    'w-44',
    'w-48',
    'w-52',
  ]

  return Array.from({ length: 18 }).map((_, index) => {
    const randomWidthClass =
      randomWidthClasses[Math.floor(Math.random() * randomWidthClasses.length)]
    return (
      <div
        key={index}
        className={cn(
          'h-10 bg-gray-700 rounded-lg animate-pulse',
          randomWidthClass
        )}
      ></div>
    )
  })
}

export default CategoryList
