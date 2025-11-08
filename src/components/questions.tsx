import { useApiData } from '../hooks/use-api-data'
import { decodeHTML } from '../utils/decodeHTML'

const QuestionsSection = () => {
  const { filteredQuestions, isLoading } = useApiData()
  return (
    <div className="py-12 m-2 rounded-lg bg-gray-900">
      <div className="container">
        <h2 className="text-xl font-bold uppercase mb-12">
          Filtered questions
        </h2>
        <div className="grid grid-cols-1 gap-4 mx-auto max-w-xl">
          {isLoading ? (
            <QuestionsLoading />
          ) : (
            filteredQuestions.map((q) => (
              <details key={q.question}>
                <summary className="cursor-pointer bg-gray-800 mb-1 font-semibold rounded-lg p-4 hover:underline">
                  {decodeHTML(q.question)}
                </summary>
                <div className="p-4 rounded-lg bg-gray-800">
                  <ul className="flex pl-4 flex-col gap-2 list-disc">
                    <li className="marker:text-green-500 font-bold">
                      {decodeHTML(q.correct_answer)}
                    </li>
                    {q.incorrect_answers.map((ia) => (
                      <li key={ia} className="marker:text-red-500">
                        {decodeHTML(ia)}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const QuestionsLoading = () => {
  return Array.from({ length: 10 }).map((_, idx) => (
    <div
      key={idx}
      className="animate-pulse bg-gray-800  h-14 mb-1 rounded-lg"
    ></div>
  ))
}

export default QuestionsSection
