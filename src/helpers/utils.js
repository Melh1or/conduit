export const range = (start, end) => {
  return [...new Array(end).keys()].map(el => el + start)
}
