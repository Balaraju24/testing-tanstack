interface Service {
  cases: number;
  revenue: number;
}

export const transformApiData = (apiData: any[]) => {
  const monthOrder = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const orgMap: Record<
    string,
    {
      name: string;
      data: Record<string, { lop: Service; eop: Service; litigation: Service }>;
      total: { lop: Service; eop: Service; litigation: Service };
      location: string;
    }
  > = {};

  const monthsSet = new Set<string>();

  apiData.forEach((entry: any) => {
    const orgName = entry.organization_name || "";
    const monthKey = entry.month?.toLowerCase() || "";
    monthsSet.add(monthKey);

    if (!orgMap[orgName]) {
      orgMap[orgName] = {
        name: orgName,
        data: {},
        total: {
          lop: { cases: 0, revenue: 0 },
          eop: { cases: 0, revenue: 0 },
          litigation: { cases: 0, revenue: 0 },
        },
        location: entry.location_name || "",
      };
    }

    if (!orgMap[orgName].data[monthKey]) {
      orgMap[orgName].data[monthKey] = {
        lop: { cases: 0, revenue: 0 },
        eop: { cases: 0, revenue: 0 },
        litigation: { cases: 0, revenue: 0 },
      };
    }

    entry.service_types?.forEach((service: any) => {
      const target =
        service.service_type === "Legal opinion"
          ? orgMap[orgName].data[monthKey].lop
          : service.service_type === "Litigation"
            ? orgMap[orgName].data[monthKey].litigation
            : orgMap[orgName].data[monthKey].eop; // default eop if missing?

      target.cases += service.cases_count;
      target.revenue += service.revenue;

      // update totals
      const totalTarget =
        service.service_type === "Legal opinion"
          ? orgMap[orgName].total.lop
          : service.service_type === "Litigation"
            ? orgMap[orgName].total.litigation
            : orgMap[orgName].total.eop;

      totalTarget.cases += service.cases_count;
      totalTarget.revenue += service.revenue;
    });
  });

  // Sorted months
  const months = Array.from(monthsSet).sort(
    (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
  );

  const organizations = Object.values(orgMap).map((org) => ({
    name: org.name,
    data: months.map((month) => ({
      month,
      lop: org.data[month]?.lop || { cases: 0, revenue: 0 },
      eop: org.data[month]?.eop || { cases: 0, revenue: 0 },
      litigation: org.data[month]?.litigation || { cases: 0, revenue: 0 },
    })),
    total: org.total,
    location: org.location,
  }));

  return { organizations, months };
};
