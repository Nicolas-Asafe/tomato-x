/**
 * Open Door: Dynamically loads a distro module from the file system.
 * This utility function imports a distro's door.js file and instantiates it.
 * Distros are plugin modules that extend framework functionality with actions,
 * responses, and validators. Uses dynamic imports to allow runtime distro discovery.
 */

export const open_door = async (distro) => {
  if (!distro) throw new Error("Door name is required")
  const door = await import(`../distros/${distro}/door.js`)
  if (!door?.default) {
    throw new Error(`Door module for ${distro} does not have a default export`)
  }
  const doorOpen = new door.default()
  return doorOpen
}