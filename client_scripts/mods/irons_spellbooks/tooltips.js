let text = `Rename for use in scroll crafting`
let items = [
	  [`kubejs:common_master_paper`,text],
    [`kubejs:uncommon_master_paper`,text],
    [`kubejs:rare_master_paper`,text],
    [`kubejs:epic_master_paper`,text],
    [`kubejs:legendary_master_paper`,text],
  ]

ItemEvents.tooltip(tooltip => {
    for (let [itemtoadd, tooltiptoadd] of items) {
      tooltip.addAdvanced(itemtoadd, (item, advanced, text) =>{
        text.add(1, Text.gold(tooltiptoadd))
      })
    }
  })