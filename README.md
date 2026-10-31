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
