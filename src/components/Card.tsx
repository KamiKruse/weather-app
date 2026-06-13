interface CardProps {
  children?: React.ReactNode
  title: string
}

export default function Card({ children, title }: CardProps) {
  return (
    <div className='p-4 rounded-xl bg-zinc-900 flex flex-col gap-4 shadow-lg'>
      <h3 className='flex justify-items-start text-xl font-bold text-zinc-200'>
        {title}
      </h3>
      {children}
    </div>
  )
}
