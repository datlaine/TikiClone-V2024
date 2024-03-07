export const renderLevelVote = ({ vote }: { vote: number }) => {
      let message = ''

      switch (vote) {
            case 5: {
                  message = 'Cực kì hài lòng'
                  return message
            }
            case 4: {
                  message = 'Hài lòng'
                  return message
            }

            case 3: {
                  message = 'Bình thường'
                  return message
            }

            case 2: {
                  message = 'Tệ'
                  return message
            }

            case 1: {
                  message = 'Rất tệ'
                  return message
            }
            default: {
                  message = 'Không nhận xét'
                  return message
            }
      }
}
