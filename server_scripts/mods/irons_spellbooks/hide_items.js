ServerEvents.tags("item", event => {
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
	"sound",
]

    items.forEach((element) => {
        // event.add("c:hidden_from_recipe_viewers", "kubejs:dummy_"+element+"_scroll")
        event.add("c:hidden_from_recipe_viewers", `kubejs:unfinished_${element}_scroll`)
    });
})