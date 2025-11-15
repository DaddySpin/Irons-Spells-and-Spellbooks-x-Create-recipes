ServerEvents.tags('item', event => {
	let items = [
		['fire','#irons_spellbooks:fire_focus'],
		['ice','#irons_spellbooks:ice_focus'],
		['blood','#irons_spellbooks:blood_focus'],
		['ender','#irons_spellbooks:ender_focus'],
		['nature','#irons_spellbooks:nature_focus'],
		['lightning','#irons_spellbooks:lightning_focus'],
		['holy','#irons_spellbooks:holy_focus'],
		['evocation','#irons_spellbooks:evocation_focus'],
		['eldritch','#irons_spellbooks:eldritch_focus'],
		['sound','#alshanex_familiars:sound_focus'],
	]
  	for (let [element, input] of items) {
		event.add(`kubejs:essence_of_${element}`, input)
	}

	event.add('vintage:curving_heads','minecraft:feather')
})