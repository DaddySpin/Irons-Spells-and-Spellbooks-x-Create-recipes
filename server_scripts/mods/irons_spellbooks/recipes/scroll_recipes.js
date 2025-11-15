let Spells = global.crafting_spells_array

ServerEvents.recipes(event => {
	let Scroll = (modid,spell,level) => {
		return Item.of('irons_spellbooks:scroll', `{ISB_Spells:{data:[{id:"${modid}:${spell}",index:0,level:${level},locked:1b}],maxSpells:1,mustEquip:0b,spellWheel:0b}}`)
	}

	let Inter = (school) => {
		return Item.of(`kubejs:unfinished_${school}_scroll`)
	}
	
	for (let spellGroup of Spells) {

		let [school, rank] = spellGroup[0];

		let random_name = `random ${rank} ${school} spell`

		let actualOutput = []

		for (let [school, rank, modid, spell, level, craftable] of spellGroup) {
			//all of the output is added to an array here.
			if (craftable === "random" || craftable === "yes") {
				actualOutput.push(Scroll(modid, spell, level));
			}
			//none random scrolls
			if (craftable === "master" || craftable === "yes") {
				event.recipes.createSequencedAssembly(
					Scroll(modid, spell, level),
					Item.of(`kubejs:${rank}_master_paper`).withName(Scroll(modid, spell, level).hoverName.string.replace(" Scroll", "").toLowerCase()).weakNBT(),
					[
						event.recipes.createFilling(Inter(school), [Inter(school), Fluid.of(`essence_of_${school}`, 10)]),
						event.recipes.createDeploying(Inter(school), [Inter(school), `irons_spellbooks:${rank}_ink`]),
						event.recipes.vintage.curving(Inter(school), Inter(school)).head('minecraft:feather')
				]).transitionalItem(Inter(school)).loops(1).id(`iron_spellbooks/sequenced/scrolls/${school}/${rank}/${spell}/level_${level}`)
			}
		}

		let representative = Item.of(`dummy_${school}_scroll`)
		.setHoverName(random_name.replace(/\b\w/g, char => char.toUpperCase()))
		.withLore(
			[Text.white("you can get:")].concat(
				actualOutput.map(item => Text.green(item.hoverName))
			)
		)

		//first item in the array here needs to be excluded from the tooltip and have the tooltip added to it.
		let outputItems = [representative.withChance(0.0)].concat(actualOutput)

		//random scrolls
		if (actualOutput.length > 0) {
			event.recipes.createSequencedAssembly(

				outputItems,
				`kubejs:${rank}_paper`,
				[
					event.recipes.createFilling(Inter(school), [Inter(school), Fluid.of(`essence_of_${school}`, 10)]),
					event.recipes.createDeploying(Inter(school), [Inter(school), `irons_spellbooks:${rank}_ink`]),
					event.recipes.vintage.curving(Inter(school), Inter(school)).head('minecraft:feather')
			]).transitionalItem(Inter(school)).loops(1).id(`iron_spellbooks/sequenced/scrolls/${school}/${rank}`)
		}
	}
})