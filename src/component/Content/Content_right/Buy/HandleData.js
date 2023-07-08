const checkLabel = (data) => {
  // console.log(data);
  let text = ''
  let give = 0
  let valueOfGive = 0
  if (data.astraLabel[0].checkAstra) {
    text = `${data.astraLabel[2].nameLabel}`
  }
  if (data.isLabel[0].checkLabel) {
    text = `Offical`
  }

  if (data.give !== 0) {
    give = data.give
    valueOfGive = data.valueOfGive
  }

  return { text, give, valueOfGive }
}

const checkVote = (data) => {
  console.log(data)
  let number = 0
  if (data.isVote[0].checkVote) {
    number = data.isVote[1].vote
  }
  if (number === 0) {
    number = ''
  }
  return number
}

const getIsBought = (data) => {
  console.log(data)
  let bought = ''
  if (data.isBought !== 0) {
    bought = `Đã bán ${data.isBought}`
  }
  console.log(bought)
  return bought
}

const getPriceAndPromote = (data) => {
  let priceDontPromote = 0
  let check
  let promote =
    data.isPromote[0].checkPromote !== false ? data.isPromote[1].promote : (check = undefined)
  console.log(promote)
  if (promote !== 0) {
    // 100 % - promote / 100 -> price / result
    let temp = (100 + promote) / 100

    priceDontPromote = data.isPrice / temp + promote
    console.log(priceDontPromote)
    return priceDontPromote.toFixed(3)
  }
  check = undefined
  return check
}

const checkShipperNow = (data) => {
  if (data.isShip[0].checkShipNOW) {
    return true
  } else {
    return false
  }
}
export { checkLabel, checkVote, getIsBought, getPriceAndPromote, checkShipperNow }
