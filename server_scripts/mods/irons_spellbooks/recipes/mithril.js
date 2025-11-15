//arrays
let AS = "irons_spellbooks:arcane_salvage"
let MS = 'kubejs:mithril_scrap'
let MI = 'kubejs:mithril_ingot'
let RM = 'kubejs:raw_mithril'
let replacements = [
	['irons_spellbooks:curios/cooldown_ring',AS,MS],
	['irons_spellbooks:curios/cast_time_ring',AS,MS],
	['irons_spellbooks:curios/heavy_chain_necklace',AS,MS],
	['irons_spellbooks:curios/emerald_stoneplate_ring',AS,MS],
	['irons_spellbooks:curios/fireward_ring',AS,MS],
	['irons_spellbooks:curios/frostward_ring',AS,MS],
	['irons_spellbooks:curios/poisonward_ring',AS,MS],
	['irons_spellbooks:curios/conjurers_talisman',AS,MS],
	['irons_spellbooks:curios/affinity_ring',AS,MS],
	['irons_spellbooks:upgrade_orb',AS,MI],
	['irons_spellbooks:spellbreaker',AS,MI],
	['irons_spellbooks:weapon_parts',AS,MI],
]

ServerEvents.recipes(event => {
	//replaceinput
	for (let [id, salvage, mithril] of replacements) {
		event.replaceInput(
			{id: id},
			salvage,
			mithril
		)
	}
	//concentration_amulet
	event.remove({ id: 'irons_spellbooks:curios/concentration_amulet' })
	event.shaped(
		'irons_spellbooks:concentration_amulet',
		[
		  ' A ',
		  'ABA',
		  ' C '
		],
		{
		  A: 'minecraft:chain',
		  B: MS,
		  C: MI
		}
	).id("kubejs:curios/concentration_amulet")
	//raw, scrap and ingot recipes
	event.blasting(MS, RM)
	event.blasting(`4x ${MS}`, MI)
	event.shaped(
		MI,
		[
		  'AA ',
		  'AA ',
		  '   '
		],
		{
		  A: MS,
		}
	).id("kubejs:mithril_ingot_to_scrap")
})

//tags
ServerEvents.tags('item', event => {
	event.add('forge:raw_materials', RM)
	event.add('forge:raw_materials/mithril', RM)

	event.add('forge:ingots', MI)
	event.add('forge:ingots/mithril', MI)
})