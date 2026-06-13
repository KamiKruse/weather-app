import { useQueries } from '@tanstack/react-query'
import {
  getCurrentWeather,
  getDailyWeather,
  getHourlyWeather,
} from './api/getWeather'
import DailyWeatherCard from './components/DailyWeatherCard'
import HourlyWeatherCard from './components/HourlyWeatherCard'
import CurrentWeatherCard from './components/CurrentWeatherCard'

export default function App() {
  const [daily, hourly, current] = useQueries({
    queries: [
      {
        queryKey: ['weather', 'daily'],
        queryFn: async () => {
          // console.log('daily query running')
          const data = await getDailyWeather({ lat: 50, lon: 50 })
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
  if (daily.isError) {
    console.error(daily.isError)
  }
  if (hourly.isError) {
    console.error(daily.isError)
  }
  if (current.isError) {
    console.error(daily.isError)
  }

  return (
    <div className='flex flex-col gap-4 max-h-screen'>
      {daily.data && <DailyWeatherCard weatherData={daily.data} />}
      {hourly.data && <HourlyWeatherCard weatherData={hourly.data} />}
      {current.data && <CurrentWeatherCard weatherData={current.data} />}
    </div>
  )
}
