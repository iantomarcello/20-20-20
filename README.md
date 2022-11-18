A supercharged snooze machine of a PWA for enforcing [the 20-20-20 rule](https://advancedeyecaremd.net/20-20-20-tipstopreventeyestrain/), as the eyes are one of the thing us devs have to deal with.

Essentially to look at something 20 feet/6 meters for 20 seconds in 20 minutes interval for maintaining the health for the eyes.

# Getting Start (as a User)
Its a PWA, so you gotta first install it, then allow notification permission so the app can notify you.

On start, the count down for 20 minutes will begin and once reached, app will notify you to look away from the screen, then notify you again after the 20 seconds.

# Getting Start (as a Dev)
Its a Svelte app. With `git worktree` and `build` setup to compile to `gh-page` folder which doubles as a branch to be deployed to GitHub Pages. 

Needs `concurrently` for `npm start` to work. (`npm i -g concurrently`).

Or just `npm run tailwindcss` and `npm run serve` separately.

## Opps
Doesn't work as well on mobiles, PWA support aren't there yet. But fingers cross that changes soon.
