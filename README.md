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
following steps. Right now there are three keywords:
    - `poetry` (Red Line) : Websites showcasing original poetry.
    - `comics` (Orange Line) : Websites showcasing original comics.
    - `creativesclub` (Yellow Line) : Websites belonging to member of [Creatives Club](https://creativesclub.art).
    - `doodlecrew` (Green Line) : Websites belonging to members of the [Doodle Crew Discord server](https://discord.gg/S3TPjtpPuP).
    - `zines` (Blue Line) : Websites with zines and zine resources.
    - `scifi` (Silver Line) : Websites with original science fiction work.

2. Substituting `KEYWORD` with one of the keywords above, add the following
lines of code to the `<body>` of your page's .html
file where you'd like the widget to appear:
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

## Change Log
### 2024-08-07
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

