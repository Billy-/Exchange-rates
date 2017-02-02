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
- [ ] Get historical data for rates
- [ ] Set up production configuration
- [ ] Set up Hot Module Replacement

### Rationale

I chose to use React mainly because I like it's stateful programming style. Some other reasons include it's efficiency at making DOM manipulations (or rather, not making them) and because react-router suits this application very nicely. I used it in conjunction with Redux for state management.

I used [react-datepicker](https://hacker0x01.github.io/react-datepicker/) for the datepicker as it has a nice UI and is configurable to my needs.

Uses [react-css-modules](https://github.com/gajus/react-css-modules) for easy modularised, scoped CSS along with [Rucksack](https://simplaio.github.io/rucksack/), mainly for responsive typography and autoprefixing from [caniuse](https://caniuse.com), but it also has a few other magical powers which will likely come in handy.

Built on Docker for super-easy, repeatable, efficient, virtualized development and production environment (..dont get me started on Docker!)

