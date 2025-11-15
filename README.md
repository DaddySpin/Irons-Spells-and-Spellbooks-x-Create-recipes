# Irons Spells and Spellbooks x Create recipes
Provides recipes for Iron's spells and spellbooks scrolls using Create

Automatically creates recipes for all registered spells from base irons spells and all addons. there is 2 types of recipes, random output of same rarity and element or exact scroll crafting.

Addons are mostly compatible, you just need to add a dummy scroll and essence fluid for any new schools/elements of magic and any spells added to the default schools/elements will work out of the box. Alshanex's Familiars is already compatible since it is the only addon i use.

Spells scrolls have multiple crafting recipes and you can configure each spell to be crafted by random, master, both or uncraftable.

 * yes - spell is craftable in both ways
 * random - spell is craftable with a random output of the same rarity and element
 * master - spell is craftable with a master crafting paper by renaming the paper to the name of the spell and it will directly craft that spell
 * no - spell is uncraftable with this script

You can change these settings in the spell_crafting_modifications array spell_index.js, by default all spells are craftable.

Also i have backported Mithril from the 1.21.1 version and changed all recipes that use Arcane Debris to instead use Mithril. You will have to use Block Swapper to replace Arcane Debris with Mithril Ore or just dont install those scripts.

Made for Minecraft Forge 1.20.1

Requires KubeJS, KubeJS Create, Create, Create: Vintage, Iron's Spell and Spellbooks and Alshanex's Familiars(optional, has built in compat)

INCOMPATIBILITES: Easy Anvils by Fuzs(it changes the formatting for renaming items in an anvil which makes master crafting recipes no longer work)

https://www.curseforge.com/minecraft/mc-mods/kubejs

https://www.curseforge.com/minecraft/mc-mods/kubejs-create

https://www.curseforge.com/minecraft/mc-mods/create

https://www.curseforge.com/minecraft/mc-mods/create-vintage-unofficial-port

https://www.curseforge.com/minecraft/mc-mods/irons-spells-n-spellbooks

https://www.curseforge.com/minecraft/mc-mods/alshanexs-familiars
