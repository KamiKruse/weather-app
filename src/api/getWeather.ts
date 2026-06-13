import {
  CurrentWeatherResponseSchema,
  DailyForecastResponseSchema,
  HourlyForecastResponseSchema,
} from '../schema/weatherSchema'

const API_KEY = import.meta.env.VITE_API_KEY

type WeatherProps = {
  lat: number
  lon: number
}
export async function getDailyWeather({ lat, lon }: WeatherProps) {
  const res = await fetch(
    `https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  )
  if (!res.ok) {
    throw new Error(`Weather API Failed: ${res.status}`)
  }
  const json = await res.json()
  //  console.log('DJSON: ', json)
  const daily = DailyForecastResponseSchema.parse(json)
  //  console.log('DPARSED: ', daily)
  //  console.log('DRETURNED: ', daily.data)
  return daily.data
}
export async function getHourlyWeather({ lat, lon }: WeatherProps) {
  const res = await fetch(
    `https://api.openweathermap.org/data/4.0/onecall/timeline/1h?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  )
  if (!res.ok) {
    throw new Error(`Weather API Failed: ${res.status}`)
  }
  const json = await res.json()
  // console.log('HJSON: ', json)
  const hourly = HourlyForecastResponseSchema.parse(json)
  // console.log('HPARSED: ', hourly)
  // console.log('HRETURNED: ', hourly.data)
  return hourly.data
}
export async function getCurrentWeather({ lat, lon }: WeatherProps) {
  const res = await fetch(
    `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  )
  if (!res.ok) {
    throw new Error(`Weather API Failed: ${res.status}`)
  }
  const json = await res.json()
  // console.log('CURJSON: ', json)
  const current = CurrentWeatherResponseSchema.parse(json)
  // console.log('CURPARSED: ', current)
  // console.log('CURRETURNED: ', current.data)
  return current.data
}
