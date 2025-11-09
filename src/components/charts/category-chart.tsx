import * as RechartsPrimitive from 'recharts'
import { useApiData } from '../../hooks/use-api-data'

const CategoryChart = () => {
  const { categories, selectedCategory, setSelectedCategory } = useApiData()
  return (
    <RechartsPrimitive.ResponsiveContainer width="100%" aspect={1}>
      <RechartsPrimitive.BarChart
        accessibilityLayer
        data={categories.map((d) => ({
          name: d.decodedName,
          value: d.count,
        }))}
      >
        <RechartsPrimitive.Tooltip
          cursor={{ fill: 'var(--color-gray-600)', radius: 6 }}
          content={CategoryChartCustomTooltip}
        />
        <RechartsPrimitive.XAxis
          tickLine={false}
          dataKey="name"
          interval={0}
          axisLine={false}
          tick={false}
        >
          <RechartsPrimitive.Label
            value="CATEGORIES"
            position="insideBottom"
            fill="var(--color-gray-100)"
            offset={-2}
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
            value="NUMBER OF QUESTIONS"
            angle={-90}
            position="insideLeft"
            fill="var(--color-gray-100)"
          />
        </RechartsPrimitive.YAxis>
        <RechartsPrimitive.Bar
          isAnimationActive={false}
          dataKey="value"
          activeBar={false}
          radius={4}
        >
          {categories.map((d) => (
            <RechartsPrimitive.Cell
              onClick={() => {
                if (d.name === selectedCategory) {
                  setSelectedCategory('All')
                  return
                }
                setSelectedCategory(d.name)
              }}
              fill={
                d.name === selectedCategory || selectedCategory === 'All'
                  ? 'var(--color-pink-400)'
                  : 'var(--color-gray-600)'
              }
              className={'stroke-pink-50 stroke-1 cursor-pointer'}
              key={d.name}
            ></RechartsPrimitive.Cell>
          ))}
        </RechartsPrimitive.Bar>
      </RechartsPrimitive.BarChart>
    </RechartsPrimitive.ResponsiveContainer>
  )
}

const CategoryChartCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as {
      name: string
      value: number
    }
    return (
      <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
        <p className="text-sm font-semibold">{data.name}</p>
        <p className="text-sm">Questions: {data.value}</p>
      </div>
    )
  }
  return null
}

export default CategoryChart
