ServerEvents.recipes(event => {

	let items = [
		["kubejs:common_paper","irons_spellbooks:common_ink",'minecraft:paper',8],
		["kubejs:uncommon_paper","irons_spellbooks:uncommon_ink",'minecraft:paper',8],
		["kubejs:rare_paper","irons_spellbooks:rare_ink",'minecraft:paper',8],
		["kubejs:epic_paper","irons_spellbooks:epic_ink",'minecraft:paper',8],
		["kubejs:legendary_paper","irons_spellbooks:legendary_ink",'minecraft:paper',8],
	]

	for (let [output, inner, outer, amount] of items) {
        event.shaped(
			Item.of(output, amount),
			[ 
			  'AAA', 
			  'ABA',
			  'AAA'
			],
			{
			  A: outer,
			  B: inner
			}
		  ).id(output)
    }
})

ServerEvents.recipes(event => {

	let items = [
		["kubejs:common_master_paper","kubejs:common_paper","kubejs:mithril_ingot",4],
		["kubejs:uncommon_master_paper","kubejs:uncommon_paper","kubejs:mithril_ingot",4],
		["kubejs:rare_master_paper","kubejs:rare_paper","kubejs:mithril_ingot",4],
		["kubejs:epic_master_paper","kubejs:epic_paper","kubejs:mithril_ingot",4],
		["kubejs:legendary_master_paper","kubejs:legendary_paper","kubejs:mithril_ingot",4],
	]

	for (let [output, outer, inner, amount] of items) {
        event.shaped(
			Item.of(output, amount),
			[ 
			  ' A ', 
			  'ABA',
			  ' A '
			],
			{
			  A: outer,
			  B: inner
			}
		  ).id(output)
    }
})