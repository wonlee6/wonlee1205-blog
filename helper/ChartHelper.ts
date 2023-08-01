import {
  barImageList,
  complexImageList,
  lineImageList,
  pieImageList
} from '@/data/ChartImages'
import {ChartType} from './../model/Chart.model'
import {barData, lineData, pieData} from '@/data/mockupData'

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
  },

  getChartListData(chartType: ChartType) {
    switch (chartType) {
      case ChartType.Line:
        return lineData
      case ChartType.Bar:
        return barData
      case ChartType.Pie:
        return pieData
      default:
        return []
    }
  }
}
