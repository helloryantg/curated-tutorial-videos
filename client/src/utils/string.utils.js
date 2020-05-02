export const camelCaseToTitleCase = (string) => {
  const result = string.replace(/([A-Z])/g, " $1")
  
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const isNullOrEmpty = string => {
  if (string === null || string === "") {
    return true
  }

  return false
}