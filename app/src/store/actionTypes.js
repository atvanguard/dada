export const LIST = {
  LIST_REQUEST: 'LIST_REQUEST',
  LIST_SUCCESS: 'LIST_SUCCESS',
  CREATOR_ART_LIST_SUCCESS: 'CREATOR_ART_LIST_SUCCESS',
  LIST_ERROR: 'LIST_ERROR',
  IMPORT_ART: 'IMPORT_ART',
  IMPORT_ART_SUCCESS: 'IMPORT_ART_SUCCESS'
}

export function importArt() {
  return {type: LIST.IMPORT_ART}
}

export function importArtSuccess(data) {
  return {type: LIST.IMPORT_ART_SUCCESS}
}