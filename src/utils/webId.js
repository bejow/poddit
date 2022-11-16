const getNameFromWebId = (webId) => {
  if (typeof webId === "string" && webId?.startsWith("http")) {
    const splittedWebId = webId.split("/")
    return splittedWebId[splittedWebId.length - 1]
  } else {
    return undefined
  }
}

export { getNameFromWebId }
