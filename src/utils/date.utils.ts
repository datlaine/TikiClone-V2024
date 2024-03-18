export const convertDateToString = (date: Date) => {
      date = new Date(date)
      let day = date.getDate().toString()
      let month = Number(date.getMonth() + 1).toString()
      let year = date.getFullYear().toString()

      day = Number(day) > 9 ? day : `0${day}`
      month = Number(month) > 9 ? month : `0${month}`

      return `${day}/${month}/${year}`
}

export const getYear = (date: Date) => {
      const year = new Date(date).getFullYear()
      return year
}

export const convertWeekday = (date: Date) => {
      let day = ''
      switch (date.getDay()) {
            case 0:
                  day = `Chủ nhật`
                  break
            case 1:
                  day = `Thứ hai`
                  break
            case 2:
                  day = `Thứ 3`
                  break
            case 3:
                  day = `Thứ tư`
                  break
            case 4:
                  day = `Thứ năm`
                  break
            case 5:
                  day = `Thứ sáu`
                  break
            case 6:
                  day = `Thử bảy`
                  break
            default:
                  day = 'Không kiểm tra được ngày'
      }

      return day
}

export const convertDateToStringFull = (date: Date) => {
      const d = new Date(date)
      let seconds = d.getSeconds().toString()
      let minutes = d.getMinutes().toString()
      let hours = d.getHours().toString()
      seconds = Number(seconds) > 9 ? seconds : `0${seconds}`
      minutes = Number(minutes) > 9 ? minutes : `0${minutes}`
      hours = Number(hours) > 9 ? hours : `0${hours}`

      return `${hours}:${minutes}:${seconds} - ${convertDateToString(date)}`
}
