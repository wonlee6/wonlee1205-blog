import {barImageList, complexImageList, lineImageList, pieImageList} from '@/data/ChartImages'
import {ChartType} from './../model/Chart.model'

export const ChartHelper = {
  getChartMenuList() {
    return [
      {name: ChartType.Line},
      {name: ChartType.Bar},
      {name: ChartType.Pie},
      {name: ChartType.Complex}
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
      case ChartType.Complex:
        return complexImageList
      default:
        return []
    }
  }
}
