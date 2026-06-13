import { z } from 'zod'

/**
 * Shared schemas
 */
export const WeatherConditionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
})

export const AlertIdSchema = z.string()

export const BaseResponseSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
})

/**
 * Current Weather
 */
export const CurrentWeatherDataSchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),

  temp: z.number(),
  feels_like: z.number(),

  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number().optional(),

  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),

  wind_speed: z.number(),
  wind_deg: z.number(),

  weather: z.array(WeatherConditionSchema).nullish(),

  alerts: z.array(AlertIdSchema).optional(),
})

export const CurrentWeatherResponseSchema = BaseResponseSchema.extend({
  data: z.array(CurrentWeatherDataSchema),
})

/**
 * Hourly Forecast
 */
export const HourlyForecastDataSchema = z.object({
  dt: z.number(),

  temp: z.number(),
  feels_like: z.number(),

  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number().optional(),

  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),

  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),

  weather: z.array(WeatherConditionSchema).nullish(),

  alerts: z.array(AlertIdSchema).optional(),

  pop: z.number().optional(),
})

export const HourlyForecastResponseSchema = BaseResponseSchema.extend({
  data: z.array(HourlyForecastDataSchema),

  prev: z.string().url(),
  next: z.string().url(),
})

/**
 * Daily Forecast
 */
export const DailyTemperatureSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
})

export const DailyFeelsLikeSchema = z.object({
  day: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
})

export const DailyForecastDataSchema = z.object({
  dt: z.number(),

  sunrise: z.number(),
  sunset: z.number(),

  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),

  temp: DailyTemperatureSchema,
  feels_like: DailyFeelsLikeSchema,

  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number().optional(),

  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),

  weather: z.array(WeatherConditionSchema).nullish(),

  rain: z.number().optional(),
  clouds: z.number(),
  pop: z.number().optional(),
  uvi: z.number(),
})

export const DailyForecastResponseSchema = BaseResponseSchema.extend({
  data: z.array(DailyForecastDataSchema),

  prev: z.string().url(),
  next: z.string().url(),
})

/**
 * Types
 */
export type CurrentWeatherData = z.infer<typeof CurrentWeatherDataSchema>

export type HourlyForecastData = z.infer<typeof HourlyForecastDataSchema>

export type DailyForecastData = z.infer<typeof DailyForecastDataSchema>
