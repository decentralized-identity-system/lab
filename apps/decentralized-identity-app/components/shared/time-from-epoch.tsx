'use client'
import * as React from 'react'

import classNames from 'clsx'
import { DateTime } from 'luxon'
import { selectDateTimeTypeAndLength } from '@/lib/utils/select-date-time-type-and-length'

interface TimeFromEpochProps {
  className?: string
  date?: number | string
  length?: number
  type?: 'DATETIME' | 'DATE' | 'TIME'
}

export const TimeFromEpoch = ({ className, date, type = 'DATE', length = 1 }: TimeFromEpochProps) => {
  const [timestamp, setTimestamp] = React.useState<string>('')
  React.useEffect(() => {
    if (date) {
      setTimestamp(DateTime.fromSeconds(Number(date)).toLocaleString(selectDateTimeTypeAndLength(type, length)))
    }
  }, [])
  const containerClassName = classNames(className, 'TimeFromEpoch')
  return <span className={containerClassName}>{timestamp}</span>
}

export default TimeFromEpoch
