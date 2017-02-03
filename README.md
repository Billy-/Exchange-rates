# Exchange rate demo app

Docker

React/Redux

PostCSS + Rucksack + CSS Modules

### Usage

[Now available on GitHub Pages!](https://billy-.github.io/Exchange-rates) - The route for the landing page won't work because react-router thinks you are trying to get `/Exchange-rates`

You will only need Docker installed to run this

`docker run -p=8080:8080 billym/exchange`

or, to build from source (with docker compose)

1. Clone this repo
2. `docker-compose up` (in repo root)

Note that the container is running in development mode, and you will need to wait for wepack dev server to start and compile the bundle. Visit [http://localhost:8080/](http://localhost:8080/) once it's running.

### Todo

- [x] Some styling
- [x] Get historical data for rates
- [ ] Have graph sticky-scroll in desktop view
- [ ] Set up production configuration
- [ ] Set up Hot Module Replacement

### Known bugs

- [x] Issue when currently compared rate is no longer available because of state change
- [ ] Base currencies that are outdated cannot show recent historical data
- [ ] Dates should not be selectable if data is note available for the currently selected base currency. (fixer.io doesnt provide this info...)

### Rationale

I chose to use React mainly because I like it's stateful programming style. Some other reasons include it's efficiency at making DOM manipulations (or rather, not making them) and because react-router suits this application very nicely. I used it in conjunction with Redux for state management.

I used [react-datepicker](https://hacker0x01.github.io/react-datepicker/) for the datepicker as it has a nice UI and is configurable to my needs.

Uses [react-css-modules](https://github.com/gajus/react-css-modules) for easy modularised, scoped CSS along with [Rucksack](https://simplaio.github.io/rucksack/), mainly for responsive typography and autoprefixing from [caniuse](https://caniuse.com), but it also has a few other magical powers which will likely come in handy.

Other React goodies include [react-responsive](https://github.com/contra/react-responsive) and [react-chartjs](https://github.com/reactjs/react-chartjs)

Built on Docker for super-easy, repeatable, efficient, virtualized development and production environment (..dont get me started on Docker!)

The UI is simple, easy to use a fully responsive. The design leaves a fair amount to be desired, but can easily be extended. The requirements included having a "home" and "about" page, however in a real world situation I would discuss the option of having all content on one page; this would help to improve the design and UX.

I found that there were some issues with data being unavailable for certain time periods and base currencies, which complicates managing state. For instance, as noted above, fixer.io doesn't provide information on which dates information for certain currencies is available. Nothing can be done about this short of checking every date back to 1999 - or simply showing an error message, as I have done. Other issues were just as a result of state change making certain data (the currently compared currency for instance) no longer applicable (no longer in applicable date range or if you changed the base to currently compared) but some simple fixes in the action creators cleared that up.
