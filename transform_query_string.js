function transform_query_string(queryString) {
  switch (queryString) {
    case "name":
      return { name: "asc" }
    case "-name":
      return { name: "desc" }
    case "category":
      return { category_id: "asc" }
    case "address":
      return { address: "desc" }
  }
}

module.exports = transform_query_string





