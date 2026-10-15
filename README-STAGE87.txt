REEL DIARY — STAGE 87: FIXED 10-POINT RATINGS

This build is based directly on the Stage 85 source at commit ecc66a324d46f57d9d49a7a6919d1b4f88241bef. Sorting/filter controls and their styling have not been changed.

Only personal-rating behaviour is updated: film and viewing ratings use 1–10; rating displays and statistics use the same scale; legacy 1–5 ratings convert proportionally (e.g. 4/5 becomes 8/10). TMDB ratings remain as before. A one-time safety prompt is shown only if a previous build marked the data as migrated but all current ratings still look like 1–5 scores.

New exports are version 4 with ratingScale: 10. Raw-array and version 1/2 backups convert on restore; ambiguous version 3 backups prompt before conversion.

To publish, upload the files in this ZIP to the repository root, replacing existing files. Keep index.html, manifest.json, sw.js, icon.svg and all PNG icon files together. This README is optional.

Live site: https://karl-1990.github.io/reel-diary/
