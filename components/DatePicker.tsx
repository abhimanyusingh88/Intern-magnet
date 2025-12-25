// "use client";

// import { DatePicker as RSuiteDatePicker } from "rsuite";
// import { useState, useEffect } from "react";

// interface DatePickerProps {
//     name?: string;
//     format?: string;
//     placeholder?: string;
//     value?: string | Date | null;
//     onChange?: (name: string, value: string) => void;
//     className?: string;
//     label?: string;
// }

// export default function DatePicker({
//     name,
//     format = "dd/MM/yyyy",
//     placeholder = "Select date",
//     value,
//     onChange,
//     className,
//     label,
// }: DatePickerProps) {
//     // Helper to parse date string (handles DD/MM/YYYY or YYYY-MM-DD)
//     const parseDate = (val: string | Date | null): Date | null => {
//         if (!val) return null;
//         if (val instanceof Date) return val;

//         const strVal = String(val);
//         // Check for DD/MM/YYYY format
//         if (/^\d{2}\/\d{2}\/\d{4}$/.test(strVal)) {
//             const [day, month, year] = strVal.split('/').map(Number);
//             return new Date(year, month - 1, day);
//         }

//         // Fallback to standard parsing (handles ISO YYYY-MM-DD etc)
//         // ensure hyphens replaced to slashes for broader compatibility if needed, though standard ISO works fine
//         return new Date(strVal.replace(/-/g, "/"));
//     };

//     const [internalDate, setInternalDate] = useState<Date | null>(parseDate(value));

//     useEffect(() => {
//         setInternalDate(parseDate(value));
//     }, [value]);

//     const handleDateChange = (date: Date | null) => {
//         // 3. Update UI immediately so the user sees their selection
//         setInternalDate(date);

//         if (onChange && name) {
//             if (date) {
//                 const year = date.getFullYear();
//                 const month = String(date.getMonth() + 1).padStart(2, "0");
//                 const day = String(date.getDate()).padStart(2, "0");
//                 const dateString = `${day}/${month}/${year}`;
//                 onChange(name, dateString);
//             } else {
//                 onChange(name, "");
//             }
//         }
//     };

//     return (
//         <div className={`flex flex-col gap-1.5 ${className}`}>
//             {label && (
//                 <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium">
//                     {label}
//                 </span>
//             )}

//             {name && (
//                 <input
//                     type="hidden"
//                     name={name}
//                     value={value && typeof value === 'string' ? value : ""}
//                 />
//             )}

//             <RSuiteDatePicker
//                 format={format}
//                 placeholder={placeholder}
//                 value={internalDate} // Use internal state here
//                 onChange={handleDateChange}
//                 appearance="subtle"
//                 style={{ width: "100%" }}
//                 className="custom-datepicker-trigger"
//             />
//         </div>
//     );
// }