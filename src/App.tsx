import { useQueries } from '@tanstack/react-query'
import {
  getCurrentWeather,
  getDailyWeather,
  getHourlyWeather,
} from './api/getWeather'
import Card from './components/Card'

export default function App() {
  const [daily, hourly, currently] = useQueries({
    queries: [
      {
        queryKey: ['weather', 'daily'],
        queryFn: () => getDailyWeather({ lat: 50, lon: 50 }),
      },
      {
        queryKey: ['weather', 'hourly'],
        queryFn: () => getHourlyWeather({ lat: 50, lon: 50 }),
      },
      {
        queryKey: ['weather', 'current'],
        queryFn: () => getCurrentWeather({ lat: 50, lon: 50 }),
      },
    ],
  })

  return (
    <div>
      <Card currently={currently.data} />
    </div>
  )
}
