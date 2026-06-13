import type { CurrentWeatherData } from '../schema/weatherSchema'

interface CardProps {
  weatherData: CurrentWeatherData[]
}

export default function CurrentWeatherCard({ weatherData }: CardProps) {
  
  return (
    <div className='bg-zinc-500 h-screen w-2xl'>
      <h3>Daily Forecast</h3>
      {weatherData.map((entry) => (
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
