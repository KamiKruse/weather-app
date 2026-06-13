import { useSuspenseQueries } from '@tanstack/react-query'
import {
  getCurrentWeather,
  getDailyWeather,
  getHourlyWeather,
} from './api/getWeather'

import DailyWeatherCard from './components/DailyWeatherCard'
import HourlyWeatherCard from './components/HourlyWeatherCard'
import CurrentWeatherCard from './components/CurrentWeatherCard'

export default function App() {
  const [daily, hourly, current] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['weather', 'daily'],
        queryFn: async () => {
          // console.log('daily query running')
          const data = await getDailyWeather({ lat: 20.5937, lon: 78.9629 })
          // console.log('query resolved', data)
          return data
        },
      },
      {
        queryKey: ['weather', 'hourly'],
        queryFn: async () => {
          // console.log('hourly query running')
          const data = await getHourlyWeather({ lat: 50, lon: 50 })
          // console.log('query resolved', data)
          return data
        },
      },
      {
        queryKey: ['weather', 'current'],
        queryFn: async () => {
          // console.log('current query running')
          const data = await getCurrentWeather({ lat: 50, lon: 50 })
          // console.log('query resolved', data)
          return data
        },
      },
    ],
  })

  return (
    <div className='flex flex-col gap-8 max-h-screen'>
      {current.data && (
        <CurrentWeatherCard
          title='Current Forecast '
          weatherData={current.data}
        />
      )}
      {hourly.data && (
        <HourlyWeatherCard title='Hourly Forecast' weatherData={hourly.data} />
      )}
      {daily.data && <DailyWeatherCard weatherData={daily.data} />}
    </div>
  )
}
