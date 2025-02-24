export async function fetchGetReq(url) {
  const response = await fetch(url);
  const places = await response.json();
  if (!response.ok) {
    throw new Error("Faild to fetch data");
  }
  return places;
}

export async function fetchPutReq(url, places) {
  const response = await fetch(url, {
    method: "put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(places),
  });
  const resdata = await response.json();
  if (!response.ok) {
    throw new Error("resdata.message");
  }
  return resdata.message;
}
