export const convertDateToString = (date: Date) => {
      date = new Date(date)
      console.log({ date: date.getDate() })
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
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
