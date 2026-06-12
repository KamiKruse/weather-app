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
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    )
    const json = await res.json()

    const daily = DailyForecastResponseSchema.parse(json)
    return daily.data
  } catch (error) {
    console.error(error)
  }
}
export async function getHourlyWeather({ lat, lon }: WeatherProps) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/4.0/onecall/timeline/1h?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    )
    const json = await res.json()

    const hourly = HourlyForecastResponseSchema.parse(json)

    return hourly.data
  } catch (error) {
    console.error(error)
  }
}
export async function getCurrentWeather({ lat, lon }: WeatherProps) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    )
    const json = await res.json()

    const current = CurrentWeatherResponseSchema.parse(json)

    return current.data
  } catch (error) {
    console.error(error)
  }
}
