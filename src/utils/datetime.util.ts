import { DateTime } from 'luxon'

export const DateTimeFromString = (time: Date): string => {
      const dayTime = DateTime.fromISO(time.toString())
      const clock = `${dayTime.hour}:${dayTime.minute < 9 ? '0' + dayTime.minute : dayTime.minute}`
      const day = dayTime.day
      const month = dayTime.month
      const year = dayTime.year
      console.log({ clock })
      return `${clock}   Ngày ${day} - tháng ${month} - năm ${year}`
}
