** Balatro Analysis API

Basic Node app which, if given a profile.jkr file from the game's save directory, can perform some analysis on it.  Intended to be used as an API endpoint in a proper application.

Once installed (`npm install`), run the main script (`npm run balatro`) with `type`, `query` and `direction` parameters following to get a JSON response back for:

type: `overall`
 - query: `Completionist`
 - query: `CompletionistPlus`
 - query: `CompletionistPlusPlus`

Basic information which could be used to determine progress towards the specific Completionist named achievements.

type: `jokers` or `decks`
 - query: `count`
 - query: `wins`
 - query: `losses`

Get a list of either jokers, or decks, that you've picked, won with, or lost with the most / least.

e.g. `npm run balatro jokers count ascending`