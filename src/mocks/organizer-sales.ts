export interface SalesKpi {
  label: string
  value: string
  trend?: string
  trendTone?: "success" | "down" | "muted"
  note?: string
}

export interface SalesDayBar {
  day: string
  previous: number
  current: number
  peak?: boolean
}

export interface SalesBarItem {
  name: string
  value: string
  percent: number
}

export const salesKpis: SalesKpi[] = [
  {
    label: "Tickets sold",
    value: "28,440",
    trend: "18%",
    trendTone: "success",
    note: "vs previous 30 days",
  },
  {
    label: "Net revenue",
    value: "SAR 1.66M",
    trend: "12%",
    trendTone: "success",
    note: "after fees",
  },
  {
    label: "Average order",
    value: "SAR 412",
    trend: "3%",
    trendTone: "down",
    note: "more Silver-tier buyers",
  },
  {
    label: "Selling pace",
    value: "948/day",
    trend: "peak 1,240",
    trendTone: "muted",
    note: "on 18 Aug",
  },
]

/** Pixel heights from Figma 298:10477 (170px track). */
export const salesRevenueDays: SalesDayBar[] = [
  { day: "8", previous: 41, current: 51 },
  { day: "9", previous: 48, current: 58 },
  { day: "10", previous: 51, current: 48 },
  { day: "11", previous: 53, current: 71 },
  { day: "12", previous: 56, current: 65 },
  { day: "13", previous: 61, current: 88 },
  { day: "14", previous: 68, current: 80 },
  { day: "15", previous: 65, current: 94 },
  { day: "16", previous: 71, current: 83 },
  { day: "17", previous: 77, current: 104 },
  { day: "18", previous: 75, current: 163, peak: true },
  { day: "19", previous: 80, current: 122 },
  { day: "20", previous: 85, current: 109 },
  { day: "21", previous: 82, current: 119 },
  { day: "22", previous: 78, current: 99 },
]

export const salesTopEvents: SalesBarItem[] = [
  { name: "Winter Nights: Amr Diab Live", value: "SAR 812K net", percent: 100 },
  { name: "Jeddah Comedy Night", value: "SAR 386K net", percent: 47.5 },
  { name: "Autumn Jazz Evening", value: "SAR 285K net", percent: 35.1 },
  { name: "Riyadh Food Truck Weekend", value: "SAR 177K net", percent: 21.8 },
]

export const salesBuyerCities: SalesBarItem[] = [
  { name: "Riyadh", value: "58%", percent: 58 },
  { name: "Jeddah", value: "24%", percent: 24 },
  { name: "Dammam", value: "9%", percent: 9 },
  { name: "Other", value: "9%", percent: 9 },
]

export const salesChartCaption =
  "Spike on the 18th: Winter Nights price-tier release sold 1,240 tickets in a day — your best single day this period."

export const salesConversion = {
  rate: "6.8%",
  trend: "0.9 pts vs previous period",
  body: "418,200 event-page views became 28,440 tickets. Winter Nights converts at 9.1%; Food Truck Weekend trails at 3.2%.",
}
