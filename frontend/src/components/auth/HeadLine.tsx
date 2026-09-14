import { ArrowLeft } from "lucide-react"
import Link from 'next/link';

type HeadlineProps = {
    heading: string;
    para: string;
    hasArrow: boolean;
    linkto: string
}

export default function HeadLine({
    heading,
    para,
    hasArrow,
    linkto,
}: HeadlineProps) {
  return (
      <div>
          <div className="grid grid-cols-3 items-center">
              <Link href={linkto}>
                  {hasArrow && (
                      <ArrowLeft className="max-xl:size-6 xl:size-8 stroke-[#161717]" />
                  )}
              </Link>
              <h3 className="col-start-2 text-center max-xl:text-[20px] xl:text-[30px] font-semibold text-[#5C85D9]">
                  {heading}
              </h3>
          </div>
          <div className="text-[#161717] text-[16px] xl:text-[20px] text-center mt-4">{para}</div>
      </div>
  );
}