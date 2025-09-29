export const SkeletonRow = ({ index }: { index: number }) => (
  <tr className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
    <td className="px-4 py-3 w-24">
      <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
    </td>
    <td className="px-4 py-3">
      <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
    </td>
    <td className="px-4 py-3 w-32">
      <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
    </td>
    <td className="px-4 py-3 w-40">
      <div className="flex gap-1">
        <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </td>
  </tr>
);
