import * as RechartsPrimitive from 'recharts'
import { useApiData } from '../../hooks/use-api-data'
import type { Difficulty } from '../../types/api-types'

const difficultyColors: { [key in Difficulty]: string } = {
  easy: 'var(--color-green-400)',
  medium: 'var(--color-yellow-400)',
  hard: 'var(--color-red-400)',
}

const DifficultyChart = () => {
  const { filteredDifficulties } = useApiData()

  return (
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
              className={'stroke-pink-50 stroke-1'}
              key={d.name}
            />
          ))}
        </RechartsPrimitive.Pie>
        <RechartsPrimitive.Legend />
        <RechartsPrimitive.Tooltip content={DifficultyChartCustomTooltip} />
      </RechartsPrimitive.PieChart>
    </RechartsPrimitive.ResponsiveContainer>
  )
}

const DifficultyChartCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as {
      name: string
      value: number
      percent: number
    }
    return (
      <div className="bg-gray-800 p-2 rounded-lg border border-gray-600">
        <p className="text-sm font-semibold">{data.name}</p>
        <p className="text-sm">Questions: {data.value}</p>
        <p className="text-sm">Percent: {data.percent}%</p>
      </div>
    )
  }
  return null
}

export default DifficultyChart
