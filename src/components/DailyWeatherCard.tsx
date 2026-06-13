import { format } from 'date-fns'
import type { DailyForecastData } from '../schema/weatherSchema'
import Card from './Card'

interface CardProps {
  weatherData: DailyForecastData[]
}

export default function DailyWeatherCard({ weatherData }: CardProps) {
  return (
    <Card title='Daily Forecast '> 
        {weatherData.map((entry) => {
          const icon = !entry.weather
            ? entry.weather[0].icon
            : getWeatherIcon(entry)

          const date = new Date(entry.dt * 1000)
          const fmtDate = format(date, 'eee d')
          return (
            <div key={entry.dt} className='flex justify-between items-center'>
              <p className='w-8 whitespace-nowrap'>{fmtDate}</p>
              <img
                className='size-16'
                src={`https://openweathermap.org/payload/api/media/file/${icon}.png`}
                alt='clear sky'
              />
              <p className='font-bold'>{Math.round(entry.temp.day)}°C</p>
              <p className='text-gray-400'>{Math.round(entry.temp.max)}°C</p>
              <p className='text-gray-400'>{Math.round(entry.temp.min)}°C</p>
            </div>
          )
        })}
    
    </Card>
  )
}

function getWeatherIcon(data: DailyForecastData) {
  const rain = data.rain ?? 0
  const pop = data.pop ?? 0
  const clouds = data.clouds ?? 0
  const temp = data.temp.min

  let isDay = true
  if (data.sunrise && data.sunset) {
    isDay = data.dt >= data.sunrise && data.dt <= data.sunset
  }
  const suffix = isDay ? 'd' : 'n'

  // Thunderstorm
  if (
    data.humidity > 70 &&
    rain > 1.5 &&
    data.temp.day > 16 &&
    data.dew_point > 15
  ) {
    return `11${suffix}`
  }
  // Shower Rain
  if (rain < 0.1 && clouds > 85 && temp > 2) {
    return `09${suffix}`
  }
  // Rain
  if (rain >= 0.25 || pop > 0.5) {
    return `10${suffix}`
  }

  // Clear sky
  if (clouds < 15) return `01${suffix}`
  // Few clouds
  if (clouds < 50) return `02${suffix}`
  // Scattered clouds
  if (clouds < 85) return `03${suffix}`
  // Overcast / Broken clouds
  return `04${suffix}`
}
