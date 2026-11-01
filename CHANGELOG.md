# Change Log

- Scale the map with the size of the canvas
- Enable the canvas for the map to dynamically scale with the size of the browser window
- Replace `map-wip.js` with map that has an `editMode` for moving the lines and stations around

## 2026-10-31
- Add `map-data.json` for storing station and line locations on the map
- Fix `forceNewTab` functionality for the Zines Line
- Remove [Codex Archonic](https://lerariemann.nekoweb.org/index.html) from the Scifi Line
- Reorder CC Line sites to match map
- Remove [Jenny](https://jenniferjantzen.com/) from the CC Line
- Fix link to [bumblechub](https://bumblechub.com/zines) on the Zines Line
- Re-add [greycloak](https://greycloak.neocities.org/writings) to the Poetry Line
- Update [Manyface](https://manyface.art) on the Poetry Line
- Remove broken Bog Quest from the Comics Line while I reach out to the owner
- Add [Hyper and Stick](https://hyperandstick.com/) to the Comics Line
- Update [Mythical Type](https://mythicaltype.neocities.org/) on the Zines Line
- Move Change Log out of the `README` and to a separate file

## 2026-04-21
- Add Jenny to CC and Poetry Lines

## 2026-02-26
- Remove Lunaseeker from Zine Line
- Add Jess/BumbleChub back to Zines Line
- Add Marcy Chow to DoodleCrew Line!

## 2026-02-19
- Add Stephanie Diederich to CC Line
- Remove folks from CC Line

## 2026-02-13
- Remove Doug's Shack from Poetry Line
- Remove teeth.dog from Poetry Line
- Re-add BrittHub to the Comics Line

## 2026-02-12
- Add Schism to Comics Line and map
- Remove Bruno and Friends from Comics Line
- Update URL for Long Gone Legends on Comics Line

## 2026-02-07
- Update Honora's link to their About page
- Update Hollis's site on the map
- Draw Zine Line after CC Line so it shows over
- Remove missing sites (marcinek, justbestvisuals, michi) from CC Line
- Add Sheryl's Momzines to Zine Line

## 2026-02-06
- Add Doodledave to Doodle Crew Line

## 2026-02-04
- Add Pigeon/columbidae to Comics Line and map
- Remove Greycloak from Poetry Line and map for missing widget
- Add Toa of Cloudbursting to map and update position in zines and poetry
- Add Toa of Cloudbursting to zines and poetry

## 2025-09-08
- Shift Silver and Orange Lines to avoid awkward placement of Orange turn behind Red
- Add Trailerparkia to Comics Line and map
- Fix bug that was preventing comics widget from appearing

## 2025-08-31
- Add Lunaseeker to Zines Line and map
- Set webring data after document loading regardless of widget creation (fix for central widget)

## 2025-08-30
- Update colors and add station to central widget

## 2025-08-29
- Position lines and station relatively in central widget

## 2025-08-28
- Begin work on a condensed transfer widget ([central.js](central.js))
- Restructure map logic around a single reference point (Central Station)

## 2025-08-27
- Add greycloak and teeth.dog to Poetry Line
- Add the Stardustverse to Scifi Line
- Widen Poetry line, make Comics line extend to lower left, and shrink DC line

## 2025-02-20
- Update Iron Ragdoll link on Comics line
- Add varve to Doodle Crew line
- Remove Soho from Comics line

## 2025-02-19
- Add Honora to Doodle Crew line

## 2025-02-10
- Add Lera to scifi line

## 2025-02-08
- Add Redux to Comics Line and map
- Update Hollis's site to 2025 art page

## 2025-02-07
- Add Bruno and Friends to Comics Line

## 2025-02-06
- Allow widget to render even when site not yet in webring data
- Add legend selection for hover/mouse

## 2025-01-22
- Load station info using data stored arrays for map
- Add `forceNewTab` and `forceURL` options to zines.js
- Replace zines.json with object in zines.js
- Replace scifi.json with object in scifi.js
- Replace poetry.json with object in poetry.js
- Replace doodlecrew.json with object in doodlecrew.js
- Replace creativesclub.json with object in creativesclub.js
- Remove comments of old JSON load structure from comics.js
- Test new structure (no JSON file) with comics line
- Add Doug's Poetry Shack to map
- Update Soho's pages on map
- Add Doug's Poetry Shack to Poetry line

## 2024-12-13
- Fix bug in `goToNext_scifi` sending to previous
- Fix bug in `goToNext_creativesclub` sending to previous
- Update Soho's domain

## 2024-10-16
- Add The Iron Ragdoll to Comics Line
- Adjust spacing in comics.json
- Rearrange Comics Line

## 2024-10-15
- Remove Dead Garden from Zines Line
- Add Olólùfè Collective to the Poetry Line
- Add Friction Comic to Scifi and Comics Lines

## 2024-10-01
- Add Beyond the End and Long Gone Legends to Comics Line

## 2024-09-19
- Add Justbestvisuals to CC line

## 2024-09-18
- Add Delovely and Manyface to Poetry line
- Rearrange lines to better accommodate new stations
- Add Britt Coxon to Comics line
- Add Adrien Lee to Comics line

## 2024-08-07
- Add force URL and force new tab options to poetry line
- Add "flower in binary" to poetry line

## 2024-08-06
- Add force URL option to scifi lines
- Add force new tab option to creativesclub and scifi lines

## 2024-08-05
- Add "window.top" to [creativesclub.js](creativesclub.js) test iframe exiting
- Add force URL option to creativesclub line
- Add The Fuzzy Slug to the comics line
- Make more space on comics line

## 2024-08-04
- Add candycaneeater07 to doodlecrew line
- Make the main station bigger
- Update legend to bubbles at the top (including scifi)
- Move stations declarations in [map.js](map.js) into `addStations`
- Stretch width of scifi line
- Shorten poetry line
- Make section of comics and doodlecrew lines co-linear
- Adjust top of doodlecrew line to have two levels

## 2024-08-03
- Add force new tab option to comics line
- Add force URL option to comics line
- Add logic to doodlecrew.js to test ability to force a URL from the HTML

## 2024-07-30
- Add granmichi to CC line
- Rearrange CC line to match map

## 2024-07-23
- Add DiabloAfterDark to Comics Line

## 2024-07-19
- Add Gus's Scifi Gallery to Doodle Crew Line
- Add Keeping Time to Comics Line
- Add Gus's Scifi Gallery to Scifi Line

## 2024-07-18
- Reroute Scifi Line through Yuki's station
- Add Yuki to Comics Line
- Add Neat Hobby! to map
- Add Neat Hobby! to Comics Line

## 2024-07-17
- Add Scifi Line to map
- Add Ether to Zines Line
- Update map.js with current state on [GusBus.Space](https://github.com/GusBusDraws/GusBusDraws.github.io)
- Copy map.js from [subway-map](https://github.com/GusBusDraws/subway-map)
- Add map-wip.js where JSONs will be loaded

## 2024-07-09
- Add Dion Ra to Scifi Line

## 2024-07-08
- Add Varve to Scifi Line
- Add Clockwork to Scifi Line
- Add files for new Scifi Line

## 2024-07-02
- Add Ultraviolents to Comics Line

## 2024-07-01
- Add MyDogStoleThisWebsite to the Zines Line

## 2024-06-27
- Prefix Yuki's site URL with "www." to handle redirect
- Add yukiclarke.com to CC & Comics Lines
- Add custom/creativesclub-yuki.js
- Add custom/comics-yuki.js
- Add dead.garden/zines to Zines Line
- Add dead.garden/poetry to Poetry Line

## 2024-06-26
- Simplify instructions

## 2024-06-25
- Reorder Doodle Crew line to match map
- Reorder CC line to match map
- Swap colors of poetry and zines lines

## 2024-06-24
- Add Mythical Type to zines line
- Add custom/zines-bumblechub.js as workaround for Google Sites
- Add bumblechub to zines line
- Add DoodleBot to CC line

## 2024-06-23
- Add the zines line

## 2024-06-21
- Update the README with instructions to join a line
- Add the poetry line with corresponding files!

## 2024-06-18
- Remove background and border style from widgets

## 2024-06-17
- Rename "smallweb-subway.js" -> [doodlecrew.js](doodlecrew.js) and "data.json" -> [doodlecrew.json](doodlecrew.json)
- Update [smallweb-subway.js](smallweb-subway.js) with "doodlecrew" suffixes for variables
- Add [creativesclub.js](creativesclub.js) and [creativesclub.json](creativesclub.json) with updated variable names to work with [smallweb-subway.js](smallweb-subway.js) on the same page!

## 2024-02-13
- Update DoodleBot address to https://gusbus.space/doodlebot/

## 2023-12-05
- Add Yama to the Doodle Crew ring
- Use concatenated hostname + pathname to find ring data JSON

## 2023-12-01
- Add Meg to the Doodle Crew ring
- Update widget text to exclude Doodle Crew link

## 2023-11-17
- Rename webring data loading functions to have separate names from DoodleBot data loading
- Update the `loadJSON()` function to take a URL as an argument
- Add change log
