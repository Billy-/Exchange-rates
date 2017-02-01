const rucksack = require('rucksack-css')

module.exports = {
    plugins: [
        rucksack({
            fallbacks: true,
            autoprefixer: true
        })
    ]
}