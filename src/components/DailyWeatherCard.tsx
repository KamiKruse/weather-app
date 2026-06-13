import type { DailyForecastData } from '../schema/weatherSchema'

interface CardProps {
  weatherData: DailyForecastData[]
}

export default function DailyWeatherCard({ weatherData }: CardProps) {
  
  return (
    <div className='bg-zinc-500 h-screen w-2xl'>
      <h3>Daily Forecast</h3>
      {weatherData.map((entry) => (
        <div key={entry.dt}>
          <div>
            <div></div>
          </div>
          <div>
            <div>{entry.feels_like.day}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
