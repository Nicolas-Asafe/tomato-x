/**
 * Place Distros: Loads all distros (plugins) specified in the project manifest.
 * This module takes the manifest configuration and dynamically loads each distro
 * specified in the distros array. Distros are plugin modules that provide actions,
 * responses, catch-responses, and type validators that can be used by routes.
 * Opens each distro door (interface) and returns loaded distro instances.
 */

import { open_door } from "../util/open_door.js"

export const place_distros = async (manifest) => {
  if (!manifest || !manifest.distros) {
    throw new Error("Manifest object with 'distros' array is required")
  }

  const distros = manifest.distros
  const distrosPlaced = []

  for (const distro of distros) {
    distrosPlaced.push(await open_door(distro,manifest.distro_configs))
  }

  return distrosPlaced
}