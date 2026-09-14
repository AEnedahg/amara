import {type ReactNode} from 'react'

export default function AuthWrapper({
    children
}: {
    children: ReactNode
}) {
  return <div className="max-xl:w-full xl:w-1/2 max-xl:px-5 xl:px-20.5 py-29">{children}</div>;
}
