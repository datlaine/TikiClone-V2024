const checkLabel = (data) => {
      if (data) {
            // console.log(data)
            let text = ''
            let give = 0
            let valueOfGive = 0
            if (data[0]?.astraLabel[0].checkAstra) {
                  text = `${data[0].astraLabel[2].nameLabel}`
            }
            if (data[0]?.isLabel[0].checkLabel) {
                  text = `Offical`
            }

            if (data[0]?.give !== 0) {
                  give = data[0]?.give
                  valueOfGive = data[0]?.valueOfGive
            }

            return { text, give, valueOfGive }
      }
}

const checkVote = (data) => {
      // console.log(data)
      let number = 0
      if (data[0]?.isVote[0].checkVote) {
            number = data[0]?.isVote[1].vote
      }
      if (number === 0) {
            number = ''
      }
      return number
}

// const getIsBought = (data) => {
//   // console.log(data)
//   if(data[0]){
//     let bought = ''
//   if (data[0]?.isBought !== 0) {
//     bought = `Đã bán ${data[0].isBought}`
//   }
//   // console.log(bought)
//   return bought
// }
// }
const getPriceAndPromote = (data) => {
      let priceDontPromote = 0
      let check
      let promote = data[0]?.isPromote[0].checkPromote !== false ? data[0]?.isPromote[1].promote : (check = undefined)
      // console.log(promote)
      if (promote !== 0) {
            // 100 % - promote / 100 -> price / result
            let temp = (100 + promote) / 100

            priceDontPromote = data[0]?.isPrice / temp + promote
            // console.log(priceDontPromote)
            return priceDontPromote.toFixed(3)
      }
      check = undefined
      return check
}

const checkShipperNow = (data) => {
      if (data[0]?.isShip[0].checkShipNOW) {
            return true
      } else {
            return false
      }
}
export { checkLabel, checkVote, getPriceAndPromote, checkShipperNow }
