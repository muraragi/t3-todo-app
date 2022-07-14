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
      className="py-2 px-4 bg-indigo-700 cursor-pointer rounded transition-all whitespace-nowrap enabled:hover:bg-indigo-800 enabled:active:scale-95 disabled:cursor-not-allowed disabled:bg-indigo-400"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
