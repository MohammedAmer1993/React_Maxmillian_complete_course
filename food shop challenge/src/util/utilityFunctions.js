export function reduceArr(array, initalVal) {
  const totalPrice = array.reduce((prev, current) => {
    return prev + current.price * current.quantity;
  }, initalVal);
  return totalPrice;
}
