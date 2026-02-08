# The Smallweb Subway
The Smallweb Subway is an experimental project that attempts to bring a
feeling of space to the indie web by using a subway system as a metaphor for
connections between hobby websites!

This is a work in progress, so right now the Smallweb Subway is only made up
of a few small lines (webrings), but I'm slowly adding more interest-based
lines. Once each line reaches a point where it can be visualized nicely,
I'll add it to the [Smallweb Subway Map](https://gusbus.space/smallweb-subway)
to show a visualization of all the lines and how they're connected!

The Smallweb Subway is an open community project and people can request to
join the growing network!

## Instructions to join
If you have a page of your website that is relevant to a line of the
Smallweb Subway and you'd like to have your site added, there are three
things you'll need to do:

1. Identify which line of the Smallweb Subway is most relevant for you to join.
Each line has a specific `KEYWORD` which is important for the
following steps. Right now there are six keywords:
    - `poetry` (Red Line) : Websites showcasing original poetry.
    - `comics` (Orange Line) : Websites showcasing original comics.
    - `creativesclub` (Yellow Line) : Websites belonging to member of [Creatives Club](https://creativesclub.art).
    - `doodlecrew` (Green Line) : Websites belonging to members of the [Doodle Crew Discord server](https://discord.gg/S3TPjtpPuP).
    - `zines` (Blue Line) : Websites with zines and zine resources.
    - `scifi` (Silver Line) : Websites with original science fiction work.

2. Add the following
lines of code to the `<body>` of your page's .html
file where you'd like the widget to appear, substituting the text `KEYWORD`
with one of the keywords listed above:
    ```html
    <script src="https://gusbus.space/smallweb-subway.js/KEYWORD.js"></script>
    <smallweb-subway-KEYWORD></smallweb-subway-KEYWORD>
    ```

3. Once you see the widget appear on your site, the buttons won't work until
your site's info is added to the right list. Have this info
(URL of page with widget, title of page, author name/alias)
added to the corresponding JSON file in one of the following ways:
    - Send Gus a DM with your info (@GusBusDraws on most sites), or
    - Email smallwebsubway at gmail dot com, or
    - Submit a pull request on [GitHub](https://github.com/GusBusDraws/smallweb-subway.js)
    editing the corresponding JSON directly.

If there are no relevant lines for you, you're welcome to suggest a new line
by reaching out to Gus!

## Developer Instructions
To install the p5 types with Node.js, first check that Node is installed:
```bash
node --version
```

If Node returns the version, make sure you have navigated to the project directory and initialize a new Node package:
```bash
npm init -y
```

Then, download & install the p5 package:
```bash
npm install @types/p5
```

### Important info about the map
For anyone interested in adding their own station to the map, keep in mind
the following information:

- The lines are drawn in coordinates relative to a single reference point:
  Central Station (the Smallweb Subway page).
- The x and y offset for each line are defined at the beginning of
  the `draw()` loop in `drawAllLines()`
- The coordinates for each line are defined at the beginning of
  the `map.js` file, and are relative to the top left corner of that
  particular line in the scale of the distance between each station
  (`stationDist`)
- The coordinates of the reference point (`refPt`) are determined by the
  size of the canvas and defined in the `setup()` loop

## Change Log
### 2026-02-07
- Update Hollis's site on the map
- Draw Zine Line after CC Line so it shows over
- Remove missing sites (marcinek, justbestvisuals, michi) from CC Line
- Add Sheryl's Momzines to Zine Line
### 2026-02-06
- Add Doodledave to Doodle Crew Line
### 2026-02-04
- Add Pigeon/columbidae to Comics Line and map
- Remove Greycloak from Poetry Line and map for missing widget
- Add Toa of Cloudbursting to map and update position in zines and poetry
- Add Toa of Cloudbursting to zines and poetry
### 2025-09-08
- Shift Silver and Orange Lines to avoid awkward placement of Orange turn behind Red
- Add Trailerparkia to Comics Line and map
- Fix bug that was preventing comics widget from appearing
### 2025-08-31
- Add Lunaseeker to Zines Line and map
- Set webring data after document loading regardless of widget creation (fix for central widget)
### 2025-08-30
- Update colors and add station to central widget
### 2025-08-29
- Position lines and station relatively in central widget
### 2025-08-28
- Begin work on a condensed transfer widget ([central.js](central.js))
- Restructure map logic around a single reference point (Central Station)
### 2025-08-27
- Add greycloak and teeth.dog to Poetry Line
- Add the Stardustverse to Scifi Line
- Widen Poetry line, make Comics line extend to lower left, and shrink DC line
### 2025-02-20
- Update Iron Ragdoll link on Comics line
- Add varve to Doodle Crew line
- Remove Soho from Comics line
### 2025-02-19
- Add Honora to Doodle Crew line
### 2025-02-10
- Add Lera to scifi line
### 2025-02-08
- Add Redux to Comics Line and map
- Update Hollis's site to 2025 art page
### 2025-02-07
- Add Bruno and Friends to Comics Line
### 2025-02-06
- Allow widget to render even when site not yet in webring data
- Add legend selection for hover/mouse
### 2025-01-22
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
### 2024-12-13
- Fix bug in `goToNext_scifi` sending to previous
- Fix bug in `goToNext_creativesclub` sending to previous
- Update Soho's domain
### 2024-10-16
- Add The Iron Ragdoll to Comics Line
- Adjust spacing in comics.json
- Rearrange Comics Line
### 2024-10-15
- Remove Dead Garden from Zines Line
- Add Olólùfè Collective to the Poetry Line
- Add Friction Comic to Scifi and Comics Lines
### 2024-10-01
- Add Beyond the End and Long Gone Legends to Comics Line
### 2024-09-19
- Add Justbestvisuals to CC line
### 2024-09-18
- Add Delovely and Manyface to Poetry line
- Rearrange lines to better accommodate new stations
- Add Britt Coxon to Comics line
- Add Adrien Lee to Comics line
### 2024-08-07
- Add force URL and force new tab options to poetry line
- Add "flower in binary" to poetry line
### 2024-08-06
- Add force URL option to scifi lines
- Add force new tab option to creativesclub and scifi lines
### 2024-08-05
- Add "window.top" to [creativesclub.js](creativesclub.js) test iframe exiting
- Add force URL option to creativesclub line
- Add The Fuzzy Slug to the comics line
- Make more space on comics line
### 2024-08-04
- Add candycaneeater07 to doodlecrew line
- Make the main station bigger
- Update legend to bubbles at the top (including scifi)
- Move stations declarations in [map.js](map.js) into `addStations`
- Stretch width of scifi line
- Shorten poetry line
- Make section of comics and doodlecrew lines co-linear
- Adjust top of doodlecrew line to have two levels
### 2024-08-03
- Add force new tab option to comics line
- Add force URL option to comics line
- Add logic to doodlecrew.js to test ability to force a URL from the HTML
### 2024-07-30
- Add granmichi to CC line
- Rearrange CC line to match map
### 2024-07-23
- Add DiabloAfterDark to Comics Line
### 2024-07-19
- Add Gus's Scifi Gallery to Doodle Crew Line
- Add Keeping Time to Comics Line
- Add Gus's Scifi Gallery to Scifi Line
### 2024-07-18
- Reroute Scifi Line through Yuki's station
- Add Yuki to Comics Line
- Add Neat Hobby! to map
- Add Neat Hobby! to Comics Line
### 2024-07-17
- Add Scifi Line to map
- Add Ether to Zines Line
- Update map.js with current state on [GusBus.Space](https://github.com/GusBusDraws/GusBusDraws.github.io)
- Copy map.js from [subway-map](https://github.com/GusBusDraws/subway-map)
- Add map-wip.js where JSONs will be loaded
### 2024-07-09
- Add Dion Ra to Scifi Line
### 2024-07-08
- Add Varve to Scifi Line
- Add Clockwork to Scifi Line
- Add files for new Scifi Line
### 2024-07-02
- Add Ultraviolents to Comics Line
### 2024-07-01
- Add MyDogStoleThisWebsite to the Zines Line
### 2024-06-27
- Prefix Yuki's site URL with "www." to handle redirect
- Add yukiclarke.com to CC & Comics Lines
- Add custom/creativesclub-yuki.js
- Add custom/comics-yuki.js
- Add dead.garden/zines to Zines Line
- Add dead.garden/poetry to Poetry Line
### 2024-06-26
- Simplify instructions
### 2024-06-25
- Reorder Doodle Crew line to match map
- Reorder CC line to match map
- Swap colors of poetry and zines lines
### 2024-06-24
- Add Mythical Type to zines line
- Add custom/zines-bumblechub.js as workaround for Google Sites
- Add bumblechub to zines line
- Add DoodleBot to CC line
### 2024-06-23
- Add the zines line
### 2024-06-21
- Update the README with instructions to join a line
- Add the poetry line with corresponding files!
### 2024-06-18
- Remove background and border style from widgets
### 2024-06-17
- Rename "smallweb-subway.js" -> [doodlecrew.js](doodlecrew.js) and "data.json" -> [doodlecrew.json](doodlecrew.json)
- Update [smallweb-subway.js](smallweb-subway.js) with "doodlecrew" suffixes for variables
- Add [creativesclub.js](creativesclub.js) and [creativesclub.json](creativesclub.json) with updated variable names to work with [smallweb-subway.js](smallweb-subway.js) on the same page!

### 2024-02-13
- Update DoodleBot address to https://gusbus.space/doodlebot/

### 2023-12-05
- Add Yama to the Doodle Crew ring
- Use concatenated hostname + pathname to find ring data JSON

### 2023-12-01
- Add Meg to the Doodle Crew ring
- Update widget text to exclude Doodle Crew link

### 2023-11-17
- Rename webring data loading functions to have separate names from DoodleBot data loading
- Update the `loadJSON()` function to take a URL as an argument
- Add change log

