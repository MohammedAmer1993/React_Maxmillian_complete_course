export default function Input({ label, invalid, ...props }) {
  let labelClass = "block mb-2 text-xs font-bold tracking-wide uppercase";
  let inputClass = "w-full px-3 py2 leading-tight  border rounded shadow";

  if (invalid) {
    labelClass += " text-red-400";
    inputClass += " text-red-500 bg-red-100 border-red-300";
  } else {
    labelClass += " text-stone-300";
    inputClass += " bg-stone-300 text-gray-700";
  }
  return (
    <p>
      <label className={labelClass}>{label}</label>
      <input className={inputClass} {...props} />
    </p>
  );
}
