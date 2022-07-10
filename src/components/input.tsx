import { ChangeEvent, KeyboardEvent, HTMLInputTypeAttribute } from 'react'

export type InputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onEnterPressed?: () => void
  type?: HTMLInputTypeAttribute
  value?: string
  placeholder?: string
}

export const Input = ({
  onChange,
  type,
  value,
  placeholder,
  onEnterPressed
}: InputProps): JSX.Element => {
  function handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onEnterPressed) {
      e.preventDefault()
      e.stopPropagation()
      onEnterPressed()
    }
  }

  return (
    <input
      className="block rounded py-2 px-2 outline-0 w-full text-slate-900"
      onChange={onChange}
      onKeyDown={e => handleKeyPress(e)}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  )
}
