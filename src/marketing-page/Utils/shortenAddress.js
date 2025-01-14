export const shortenAddress = (address) => {
  if (address.length == 0) return "";
  let shortAddress =
    address.slice(0, 6) +
    "..." +
    address.slice(address.length - 4, address.length);
  return shortAddress;
};
export const shortenAddress1 = (address) => {
  if (address.length == 0) return "";
  let shortAddress =
    address.slice(0, 10) +
    "..." +
    address.slice(address.length - 10, address.length);
  return shortAddress;
};
