import { MouseEvent } from 'react'

export type ButtonProps = {
  children?: React.ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

export const Button = ({
  children,
  onClick,
  disabled
}: ButtonProps): JSX.Element => {
  return (
    <button
      disabled={disabled}
      className="py-2 px-4 bg-indigo-700 hover:bg-indigo-800 active:scale-95 cursor-pointer rounded transition-all whitespace-nowrap"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
