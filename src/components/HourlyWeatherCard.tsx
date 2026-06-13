import type { HourlyForecastData } from '../schema/weatherSchema'

interface CardProps {
  weatherData: HourlyForecastData[]
}

export default function HourlyWeatherCard({ weatherData }: CardProps) {
  
  return (
    <div className='bg-zinc-500 h-screen w-2xl'>
      <h3>Hourly Forecast</h3>
      {weatherData.slice(1,10).map((entry) => (
        <div key={entry.dt}>
          <div>
            <div></div>
          </div>
          <div>
            <div>{entry.feels_like}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
