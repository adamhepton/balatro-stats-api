# Balatro Analysis API

Basic Node app which, if given a profile.jkr file from the game's save directory, can perform some analysis on it.  Intended to be used as an API endpoint in a proper application.

Once installed (`npm install`), drop your own profile.jkr file into the data directory, and convert to json using (`npm run convert`) from the root of the repo.

For running the main analysis script, use `npm run balatro` with `type`, `query` and `variant` parameters following to get a JSON response back for:

type: `overall`
 - query: `Completionist`
   - variant not applicable
 
 - query: `CompletionistPlus`
 - query: `CompletionistPlusPlus`
   - variant default `summary`: provide `tally` of wins out of total (`of`)
   - variant: `detail`: break down number of wins (total) by deck/joker as appropriate to the achievement
   - variant: `byStake`: show wins for a deck or joker of at least a certain stake level, from 0 (white) to 7 (gold), using a further `atLeast` parameter, e.g. `npm run balatro overall CompletionistPlus byStake 4` to show all decks where you have won at least at Red Stake (5/8, zero-indexed to 4) level.

Basic information which could be used to determine progress towards the specific Completionist named achievements.

e.g. `npm run balatro overall CompletionistPlus detail`

- query: `CompleteCompletionist`
  - variant not applicable

Combined method to provide percentage progress towards all Completionist achievements.

e.g. `npm run balatro overall CompleteCompletionist`

type: `jokers` or `decks`
 - query: `count`
 - query: `wins`
 - query: `losses`
   - variant default: `descending`
   - variant `ascending`

Get a list of either jokers, or decks, that you've picked, won with, or lost with the most / least.

e.g. `npm run balatro jokers count ascending`
