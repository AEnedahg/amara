import { loginSchemaType } from "@/schema/loginSchema"; 
import { 
    type UseFormRegister, 
    FieldErrors, 
    type UseFormWatch, 
} from "react-hook-form"; 
import { Check } from "lucide-react"; 
import clsx from "clsx"; 
 
export default function EmailField({ 
    register, 
    errors, 
    watch, 
}: { 
    register: UseFormRegister<loginSchemaType>; 
    errors: FieldErrors<loginSchemaType>; 
    watch: UseFormWatch<loginSchemaType>; 
}) { 
    const email = watch("email"); 
 
    return (
        <div className="mt-10">
            <div className="relative">
                <label
                    htmlFor="email"
                    className="text-[#3B3B3B] text-[16px] mb-3 inline-block"
                >
                    Email address
                </label>
                <input
                    {...register("email")}
                    className={clsx(
                        "border border-[#CED4DA] w-full rounded-lg placeholder:text-[#666666] p-4",
                        errors.email
                            ? "outline-red-500 bg-red-50 text-red-500 focus:outline-red-500"
                            : email
                              ? "bg-green-50 outline-green-500 text-green-500 focus:outline-green-500 border-2 border-green-500"
                              : "",
                    )}
                    placeholder="name@example.com"
                />

                {email && !errors.email && (
                    <div className="size-6 rounded-full bg-green-500/90 flex justify-center items-center absolute right-4 top-13">
                        <Check className="stroke-white size-1/2" />
                    </div>
                )}
            </div>
            {errors && (
                <small className="text-red-500">{errors.email?.message}</small>
            )}
        </div>
    ); 
} 