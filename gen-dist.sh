#!/bin/sh

readonly INPUT_FILE="modules/TxtRenderer.js"
readonly OUTPUT_FILE="dist/TxtRenderer.js"

[ -f "${INPUT_FILE}" ] || exit 1

[ -f "${OUTPUT_FILE}" ] && rm "${OUTPUT_FILE}"

while IFS= read -r line; do
  case "${line}" in
    *TR_Debug*)
	  ;;
    *)
	  printf "%s\n" "${line}" >> "${OUTPUT_FILE}" 
	  ;;
  esac
done < "${INPUT_FILE}"
