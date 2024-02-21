export const convertDateToString = (date: Date) => {
      date = new Date(date)
      console.log({ date: date.getDate() })
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
