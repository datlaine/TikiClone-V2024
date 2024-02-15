export const renderCountStar = (votes: number) => {
      const ceilVote = Math.ceil(votes)
      return ceilVote
}

//4.5 -> votes
//ceil 5 -> star render
// 4 star 1
/**
      4.5
      3.5
2.5
1.5
0.5
 */

export const diffrenceBetweenStar = (votes: number = 4.5) => {
      const countStarRender = renderCountStar(votes)
      const newArrayColorStart: number[] = []
      for (let index = 0; index < countStarRender; index++) {
            if (votes < 1 && votes >= 0.5) {
                  newArrayColorStart.push(0.5)
                  return newArrayColorStart
            }

            if (votes < 0.5) {
                  newArrayColorStart.push(0)
                  return newArrayColorStart
            }
            newArrayColorStart.push(1)
            votes -= 1
      }
}
