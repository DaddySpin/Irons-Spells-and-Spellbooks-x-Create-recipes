let irons = "irons_spellbooks"
let items = [
	['fire',irons,0xd17d1f],
	['ice',irons,0x9ec5f3],
	['blood',irons,0x842525],
	['ender',irons,0x451f46],
	['nature',irons,0xc0eb8d],
	['lightning',irons,0x4e606d],
	['holy',irons,0xd1bc54],
	['evocation',irons,0x784026],
	['eldritch',irons,0x095060],
	['sound','alshanex_familiars',0x729475],
]

StartupEvents.registry('item', event => {
	for (let [element,modid,color] of items) {
		event.create('dummy_'+element+'_scroll').texture(modid+':item/scroll_'+element)
		event.create('unfinished_'+element+'_scroll', 'create:sequenced_assembly')
	}
})

StartupEvents.registry('fluid', event => {
    for (let [element,modid,color] of items) {
      event.create('kubejs:essence_of_' + element)
      .thinTexture(color)
      .noBlock() 
    }
})