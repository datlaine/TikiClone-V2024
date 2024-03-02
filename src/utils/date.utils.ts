export const convertDateToString = (date: Date) => {
      date = new Date(date)
      let day = date.getDate().toString()
      let month = Number(date.getMonth() + 1).toString()
      let year = date.getFullYear().toString()

      day = Number(day) > 9 ? day : `0${day}`
      month = Number(month) > 9 ? month : `0${month}`

      return `${day}/${month}/${year}`
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
