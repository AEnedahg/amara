import Link from 'next/link';

type AuthFooterType = {
    optionText: string;
    optionLinkText: string;
    optionLinkHref: string;
}

export default function AuthFooter({
    optionText,
    optionLinkText,
    optionLinkHref
}: AuthFooterType) {
  return (
    <div className='w-max mx-auto mt-10'>
        <small className='text-[15px] text-gray-500'>{optionText}</small>&nbsp;
        <Link href={optionLinkHref} className='text-[#5C85D9]'>{optionLinkText}</Link>
    </div>
  )
}
