import { format } from 'date-fns'
import type { CurrentWeatherData } from '../schema/weatherSchema'
import Card from './Card'

interface CardProps {
  weatherData: CurrentWeatherData[]
  title: string
}

export default function CurrentWeatherCard({ weatherData, title }: CardProps) {
  return (
    <Card title={title}>
      <div className='flex'>
        {weatherData.map((entry) => {
          const date = new Date(entry.dt * 1000)
          const fmtDate = format(date, 'h:mm a')
          return (
            <div key={entry.dt} className='flex gap-4 items-center'>
              <p className='whitespace-nowrap'>{fmtDate}</p>
              <img
                className='size-8'
                src={`https://openweathermap.org/payload/api/media/file/${entry.weather[0].icon}.png`}
                alt='clear sky'
              />
              <p className='font-bold'>{Math.round(entry.temp)}°C</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
