export function handleError(res, e) {
  console.log(e);
  res.status(500).send(e)
}