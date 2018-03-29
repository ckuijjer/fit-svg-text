// Non performing implementation of https://en.wikipedia.org/wiki/Composition_(combinatorics)
const compositions = list => {
  const bits = list.length - 1
  const number_of_compositions = Math.floor(Math.pow(2, bits))

  const compositions = new Array(number_of_compositions).fill(0).map((_, i) => {
    const composition = i
      .toString(2)
      .padStart(bits, '0')
      .split('')
      .reduce(
        (acc, bit, j) => {
          const item = list[j + 1]

          if (item) {
            if (bit === '0') {
              // add it to the last list
              acc[acc.length - 1].push(item)
            } else {
              // add it as a new list
              acc.push([item])
            }
          }

          return acc
        },
        [[list[0]]],
      )

    return composition
  })

  return compositions
}

export default compositions
