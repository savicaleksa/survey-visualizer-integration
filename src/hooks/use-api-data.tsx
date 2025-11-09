import type React from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ApiResponse, Difficulty, Question } from '../types/api-types'
import { decodeHTML } from '../utils/decodeHTML'

export type Category = {
  name: string
  count: number
  decodedName: string
}

const BASE_API_URL = 'https://opentdb.com'
const NUMBER_OF_QUESTIONS = 50
const RATE_LIMIT_INTERVAL_MS = 5000
const RATE_LIMIT_CODE = 5

const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

type OpenTriviaDBContextType = {
  filteredQuestions: Question[]
  categories: Category[]
  categoriesWithAll: Category[]
  difficulties: Difficulty[]
  filteredDifficulties: { name: Difficulty; count: number; percent: number }[]
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  updateApiData: (number_of_questions?: number) => Promise<void>
  error: string | null
  isRateLimited: boolean
}

const OpenTriviaDBContext = createContext<OpenTriviaDBContextType | null>(null)

export const useApiData = () => {
  const context = useContext(OpenTriviaDBContext)
  if (!context) {
    throw new Error('useApiData must be used within a <ApiDataProvider />')
  }
  return context
}

export const ApiDataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [apiResponse, setApiReponse] = useState<ApiResponse | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const categories = useMemo(() => {
    return apiResponse && apiResponse?.results.length > 0
      ? apiResponse?.results.reduce((acc, question) => {
          if (!acc.find((cat) => cat.name === question.category)) {
            const currentCategoryCount = apiResponse.results.filter(
              (q) => q.category === question.category
            ).length

            acc.push({
              name: question.category,
              count: currentCategoryCount,
              decodedName: decodeHTML(question.category), // Decoding amps and quotes from categories
            })
          }
          return acc
        }, [] as Category[])
      : []
  }, [apiResponse])
  const categoriesWithAll = useMemo(() => {
    return [
      {
        name: 'All',
        count: apiResponse ? apiResponse.results.length : 0,
        decodedName: 'All',
      },
      ...categories,
    ]
  }, [categories, apiResponse])

  const filteredQuestions = useMemo(() => {
    if (!apiResponse) return []
    return apiResponse.results.filter((question) => {
      return (
        selectedCategory === 'All' || question.category === selectedCategory
      )
    })
  }, [apiResponse, selectedCategory])

  const filteredDifficulties = useMemo(() => {
    const difficultyCounts: { [key in Difficulty]: number } = {
      easy: 0,
      medium: 0,
      hard: 0,
    }
    if (!apiResponse) return []
    filteredQuestions.forEach((question) => {
      difficultyCounts[question.difficulty]++
    })
    return difficulties.map((difficulty) => ({
      name: difficulty,
      count: difficultyCounts[difficulty],
      percent: Math.round(
        (difficultyCounts[difficulty] / filteredQuestions.length) * 100
      ),
    }))
  }, [apiResponse, selectedCategory])

  const rateLimit = useCallback(() => {
    setIsRateLimited(true)
    setTimeout(() => {
      setIsRateLimited(false)
    }, RATE_LIMIT_INTERVAL_MS)
  }, [])

  const updateApiData = useCallback(
    async (number_of_questions = NUMBER_OF_QUESTIONS) => {
      if (isRateLimited || !isMounted) return
      console.log('Fetching new data from API...')
      setSelectedCategory('All')
      setError(null)
      setIsLoading(true)

      try {
        const data = await fetch(
          `${BASE_API_URL}/api.php?amount=${number_of_questions}`
        )

        rateLimit()

        const json = (await data.json()) as ApiResponse
        if (json.response_code === RATE_LIMIT_CODE) {
          throw new Error('Rate limit exceeded')
        }
        setApiReponse(json)
      } catch (error) {
        if (error instanceof Error) {
          setError(`Error fetching data from API: ${error.message}`)
          console.error('Error fetching data from API:', error.message)
        } else {
          setError('An unknown error occurred')
          console.error('An unknown error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    },
    [isRateLimited, isMounted, rateLimit]
  )

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
      console.log('Component mounted...')
    } else {
      console.log('Initial data fetch...')
      updateApiData()
    }
  }, [isMounted])

  return (
    <OpenTriviaDBContext.Provider
      value={{
        filteredQuestions,
        categories,
        categoriesWithAll,
        difficulties,
        filteredDifficulties,
        selectedCategory,
        setSelectedCategory,

        isLoading,
        updateApiData,
        error,
        isRateLimited,
      }}
    >
      {children}
    </OpenTriviaDBContext.Provider>
  )
}
