import { useApiData } from '../hooks/use-api-data'

const LoadDataButton = () => {
  const { isLoading, isRateLimited, updateApiData } = useApiData()

  const isDisabled = isLoading || isRateLimited
  return (
    <button
      onClick={() => updateApiData()}
      disabled={isDisabled}
      className="py-2 px-4 bg-pink-500 disabled:opacity-50 disabled:pointer-events-none text-pink-950 hover:bg-pink-400 font-semibold cursor-pointer hover: rounded-lg"
    >
      {isDisabled
        ? isRateLimited
          ? 'Please wait before loading again'
          : 'Loading...'
        : 'Load Data'}
    </button>
  )
}

export default LoadDataButton
