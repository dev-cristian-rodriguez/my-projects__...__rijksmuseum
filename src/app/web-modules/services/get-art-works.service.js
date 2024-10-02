const getArtWorks = async (art_work_params) => {
  const apiKey = process.env.RIJKSMUSEUM_API_KEY || "KHn4xrLx";

  let baseUrl = "https://www.rijksmuseum.nl";
  let path = `/api/en/collection/`;
  let perPage = 14;

  // Params
  path += `?key=${apiKey}`;
  path += `&ps=${perPage}`;
  path += art_work_params?.page ? `&p=${art_work_params?.page}` : "";
  path += art_work_params?.search ? `&q=${art_work_params?.search}` : "";

  // Request
  const res = await fetch(baseUrl + path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default getArtWorks;
