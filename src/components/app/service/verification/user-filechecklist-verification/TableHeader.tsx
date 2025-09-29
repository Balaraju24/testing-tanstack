const TableHeader = () => (
  <thead className="bg-black sticky top-0 z-10">
    <tr>
      <th className="px-4 py-3 text-left text-xs font-normal text-white uppercase tracking-wider">
        Date
      </th>
      <th className="px-4 py-3 text-left text-xs font-normal text-white uppercase tracking-wider">
        Document Name
      </th>
      <th className="px-4 py-3 text-left text-xs font-normal text-white uppercase tracking-wider">
        Type
      </th>
      <th className="px-4 py-3 text-left text-xs font-normal text-white uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
);

export default TableHeader;
