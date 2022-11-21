import { getSolidDataset, getThing, getStringNoLocale } from "@inrupt/solid-client"
import { FOAF } from "@inrupt/vocab-common-rdf"

const getProfile = async (webId, callback) => {
  const profileURL = new URL(webId)
  // remove hash
  profileURL.hash = ""

  // get solid dataset
  let profileData = await getSolidDataset(profileURL.href)

  // get profile data
  let profile = getThing(profileData, webId)

  // create profile object
  const name = getStringNoLocale(profile, FOAF.name)

  const profileObject = { name }

  callback(profileObject)
}

export default getProfile
