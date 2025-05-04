import {
  barImageList,
  funnelImageList,
  gaugeImageList,
  lineImageList,
  pieImageList,
  sunburstImageList
} from '@/data/chart-images'
import { ChartType } from '@/types/chart'

export const ChartHelper = {
  getChartMenuList() {
    return [
      { name: ChartType.Line },
      { name: ChartType.Bar },
      { name: ChartType.Pie },
      { name: ChartType.Funnel },
      { name: ChartType.Sunburst },
      { name: ChartType.Gauge }
    ]
  },

  getChartList(chartType: ChartType) {
    switch (chartType) {
      case ChartType.Line:
        return lineImageList
      case ChartType.Bar:
        return barImageList
      case ChartType.Pie:
        return pieImageList
      case ChartType.Funnel:
        return funnelImageList
      case ChartType.Sunburst:
        return sunburstImageList
      case ChartType.Gauge:
        return gaugeImageList
      default:
        return []
    }
  }
}
