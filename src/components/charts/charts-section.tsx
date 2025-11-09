import * as RechartsPrimitive from 'recharts'
import { useApiData } from '../../hooks/use-api-data'
import type { Difficulty } from '../../types/api-types'

const difficultyColors: { [key in Difficulty]: string } = {
  easy: 'var(--color-green-400)', // Green
  medium: 'var(--color-yellow-400)', // Yellow
  hard: 'var(--color-red-400)', // Red
}

const ChartsSection = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredDifficulties,
    isLoading,
  } = useApiData()
  return (
    <div className="py-12 m-2 bg-gray-900 rounded-lg">
      <div className="container">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12 lg:gap-4">
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">
              Categories Distribution
            </h2>
            <div className="aspect-square p-4 max-w-3xl mx-auto bg-gray-800 rounded-lg">
              {!isLoading && (
                <RechartsPrimitive.ResponsiveContainer width="100%" aspect={1}>
                  <RechartsPrimitive.BarChart
                    accessibilityLayer
                    data={categories.map((d) => ({
                      name: d.decodedName,
                      value: d.count,
                      isSelected: d.name === selectedCategory,
                    }))}
                  >
                    <RechartsPrimitive.Tooltip
                      cursor={{ fill: 'var(--color-gray-600)' }}
                      content={CustomTooltip}
                    />
                    <RechartsPrimitive.XAxis
                      tickLine={false}
                      dataKey="name"
                      interval={0}
                      axisLine={false}
                      tick={false}
                    >
                      <RechartsPrimitive.Label
                        value="Categories"
                        position="insideBottom"
                        fill="var(--color-gray-100)"
                      />
                    </RechartsPrimitive.XAxis>
                    <RechartsPrimitive.YAxis
                      width={'auto'}
                      tickMargin={16}
                      tickLine={false}
                      axisLine={false}
                      tick={false}
                    >
                      <RechartsPrimitive.Label
                        value="Number of Questions"
                        angle={-90}
                        position="insideLeft"
                        fill="var(--color-gray-100)"
                      />
                    </RechartsPrimitive.YAxis>
                    <RechartsPrimitive.Bar
                      isAnimationActive={false}
                      dataKey="value"
                      activeBar={false}
                    >
                      {categories.map((d) => (
                        <RechartsPrimitive.Cell
                          onClick={() => setSelectedCategory(d.name)}
                          fill={
                            d.name === selectedCategory ||
                            selectedCategory === 'All'
                              ? 'var(--color-pink-400)'
                              : 'var(--color-gray-600)'
                          }
                          className={'stroke-pink-50 stroke-2 cursor-pointer'}
                          key={d.name}
                        ></RechartsPrimitive.Cell>
                      ))}
                    </RechartsPrimitive.Bar>
                  </RechartsPrimitive.BarChart>
                </RechartsPrimitive.ResponsiveContainer>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold uppercase mb-4">
              Difficulty Distribution by Selected Category
            </h2>
            <div className="aspect-square max-w-3xl mx-auto bg-gray-800 rounded-lg">
              {!isLoading && (
                <RechartsPrimitive.ResponsiveContainer width="100%" aspect={1}>
                  <RechartsPrimitive.PieChart accessibilityLayer>
                    <RechartsPrimitive.Pie
                      isAnimationActive={false}
                      label={(e) => `${e.percent}%`}
                      data={filteredDifficulties.map((d) => ({
                        name: d.name.toUpperCase(),
                        value: d.count,
                        color: difficultyColors[d.name] || 'red',
                        percent: d.percent,
                      }))}
                      dataKey="value"
                      nameKey="name"
                      outerRadius="80%"
                      innerRadius="30%"
                    >
                      {filteredDifficulties.map((d) => (
                        <RechartsPrimitive.Cell
                          fill={difficultyColors[d.name]}
                          className={'stroke-pink-50 stroke-2'}
                          key={d.name}
                        />
                      ))}
                    </RechartsPrimitive.Pie>
                    <RechartsPrimitive.Legend />
                    <RechartsPrimitive.Tooltip content={CustomTooltip} />
                  </RechartsPrimitive.PieChart>
                </RechartsPrimitive.ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as {
      name: string
      value: number
      isSelected: boolean
      percent?: number
    }
    return (
      <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
        <p className="text-sm font-semibold">{data.name}</p>
        <p className="text-sm">Questions: {data.value}</p>
        {data.percent !== undefined && (
          <p className="text-sm">Percent: {data.percent}%</p>
        )}
      </div>
    )
  }
  return null
}

// const CustomLegend = ({ payload }: any) => {
//   console.log(payload)
//   return (
//     <div className="flex flex-col space-y-2">
//       {payload.map((entry: any, index: number) => (
//         <div key={`item-${index}`} className="flex items-center space-x-2">
//           <div
//             className="w-4 h-4"
//             style={{ backgroundColor: entry.payload.color }}
//           ></div>
//           <span className="text-sm">{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   )
// }

export default ChartsSection
