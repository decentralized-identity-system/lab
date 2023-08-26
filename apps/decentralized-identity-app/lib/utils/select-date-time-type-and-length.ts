import { DateTime } from 'luxon'

export function selectDateTimeTypeAndLength(type: string, length: number) {
  switch (type) {
    case 'DATETIME':
      switch (length) {
        case 1:
          return DateTime.DATETIME_SHORT
        case 2:
          return DateTime.DATETIME_MED
        case 3:
          return DateTime.DATETIME_FULL
        case 4:
          return DateTime.DATETIME_HUGE
        default:
          return DateTime.DATETIME_MED
      }
    case 'DATE':
      switch (length) {
        case 1:
          return DateTime.DATE_SHORT
        case 2:
          return DateTime.DATE_MED
        case 3:
          return DateTime.DATE_FULL
        case 4:
          return DateTime.DATE_HUGE
        default:
          return DateTime.DATE_MED
      }
    case 'TIME':
      switch (length) {
        case 1:
          return DateTime.TIME_SIMPLE
        case 2:
          return DateTime.TIME_WITH_SECONDS
        case 3:
          return DateTime.TIME_WITH_SHORT_OFFSET
        case 4:
          return DateTime.TIME_WITH_LONG_OFFSET
        default:
          return DateTime.TIME_SIMPLE
      }
  }
}
