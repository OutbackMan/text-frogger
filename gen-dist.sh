#!/bin/sh

readonly INPUT_FILE="modules/lib/TxtEngine.js"
readonly OUTPUT_FILE="dist/TxtEngine.js"

if [ ! -f "${INPUT_FILE}" ]; then
  printf "Input file: ${INPUT_FILE} does not exist" &1>2 && exit 1
fi

[ -f "${OUTPUT_FILE}" ] && rm "${OUTPUT_FILE}"

while IFS= read -r line; do
  case "${line}" in
    *Debug*)
	  ;;
    *)
	  printf "%s\n" "${line}" >> "${OUTPUT_FILE}" 
	  ;;
  esac
done < "${INPUT_FILE}"
