import type { CurrentWeatherData } from "../schema/weatherSchema"

interface CardProps {
 currently: CurrentWeatherData[]

}

export default function Card({ currently }: CardProps) {
 console.log(currently)
  return <div className='bg-red-500 w-2xl'></div>
}
