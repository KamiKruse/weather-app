import { format } from 'date-fns'
import type { HourlyForecastData } from '../schema/weatherSchema'
import Card from './Card'

interface CardProps {
  weatherData: HourlyForecastData[]
  title: string
}

export default function HourlyWeatherCard({ weatherData, title }: CardProps) {
  console.log(weatherData)
  return (
    <Card title={title}>
      <div className='flex gap-8  overflow-x-scroll'>
        {weatherData.map((entry) => {
          const date = new Date(entry.dt * 1000)
          const fmtDate = format(date, 'h:mm a')
          return (
            <div key={entry.dt} className='flex flex-col items-center mb-4  '>
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
