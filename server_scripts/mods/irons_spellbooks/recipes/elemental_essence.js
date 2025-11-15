ServerEvents.recipes(event => {
	let items = [
		"fire",
    "ice",
    "blood",
    "ender",
    "nature",
    "lightning",
    "holy",
    "evocation",
    "eldritch",
		"sound"
	]

	for (let item of items) {
		event.recipes.vintage.centrifugation(Fluid.of(`kubejs:essence_of_${item}`, 10), `#kubejs:essence_of_${item}`, 100, 64).id(`kubejs:vintage/centrifuge/essence_of_${item}`)
	}
  })