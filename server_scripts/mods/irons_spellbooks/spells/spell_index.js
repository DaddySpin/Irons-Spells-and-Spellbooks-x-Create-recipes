// priority: 1000

//change if spells are cratable
//yes, master, random, or no
let spell_crafting_modifications = [
	["irons_spellbooks:abyssal_shroud", "yes"],
	["irons_spellbooks:sculk_tentacles", "yes"],
	["irons_spellbooks:sonic_boom", "yes"],
	["irons_spellbooks:planar_sight", "yes"],
	["irons_spellbooks:telekinesis", "yes"],
	["irons_spellbooks:eldritch_blast", "yes"],
]

let SpellRegistry = Java.loadClass("io.redspace.ironsspellbooks.api.registry.SpellRegistry")

/**
 * Builds a formatted spell index from the enabled spells in the SpellRegistry.
 * The index is structured as a map of spell names to their details, including school,
 * modid, rarity levels, and whether they are craftable.
 */
function buildSpellIndex() {
    // Map: spell_name -> { school, modid, spellname, craftable, rarity: { ... } }
    let spellMap = {};

    // Rarity order for sorting and range calculation
    const rarities = ["common", "uncommon", "rare", "epic", "legendary"];

    // 1. Gather all spell entries by spell_name and rarity
       SpellRegistry.getEnabledSpells().forEach(spell => {
			let spell_id = spell.getSpellId()
			let school = spell.getSchoolType().displayName.string.toLowerCase()
			let split = spell_id.split(":")
			let modid = split[0]
			let spell_name = split[1]
			let rarity_common = spell.getMinLevelForRarity("common");
			let rarity_uncommon = spell.getMinLevelForRarity("uncommon");
			let rarity_rare = spell.getMinLevelForRarity("rare");
			let rarity_epic = spell.getMinLevelForRarity("epic");
			let rarity_legendary = spell.getMinLevelForRarity("legendary");
			
			if (rarity_legendary === rarity_epic)
				rarity_legendary = 0; // If legendary is same as epic, set to 0 to avoid confusion
			if (rarity_epic === rarity_rare)
				rarity_epic = 0; // If epic is same as rare, set to 0 to avoid confusion
			if (rarity_rare === rarity_uncommon)
				rarity_rare = 0; // If rare is same as uncommon, set to 0 to avoid confusion
			if (rarity_uncommon === rarity_common)
				rarity_uncommon = 0; // If uncommon is same as common, set to 0 to avoid confusion

            if (!spellMap[spell_id]) {
                spellMap[spell_id] = {
                    "school": school,
                    "modid": modid,
					"spell_name": spell_name,
                    "craftable": "yes",
                    "rarity": {
                        "common": { "start": rarity_common, "levels": [] },
                        "uncommon": { "start": rarity_uncommon, "levels": [] },
                        "rare": { "start": rarity_rare, "levels": [] },
                        "epic": { "start": rarity_epic, "levels": [] },
                        "legendary": { "start": rarity_legendary, "levels": [] }
                    }
                };
            }
        })

    // 2. For each spell, fill in levels arrays for each rarity
    for (let spell_id in spellMap) {
        let rarityStarts = {};
        // Collect all starts for this spell
        for (let rarity of rarities) {
            rarityStarts[rarity] = spellMap[spell_id]["rarity"][rarity].start;
        }

        // Now fill levels for each rarity
        for (let i = 0; i < rarities.length; i++) {
            let rarity = rarities[i];
            let start = rarityStarts[rarity];
            if (start === 0) {
                spellMap[spell_id]["rarity"][rarity].levels = [];
                continue;
            }
            let nextStart = null;
            for (let j = i + 1; j < rarities.length; j++) {
                if (rarityStarts[rarities[j]] !== 0) {
                    nextStart = rarityStarts[rarities[j]];
                    break;
                }
            }
            let levels = [];
            if (nextStart === null) {
                levels = [start];
            } else {
                for (let n = start; n < nextStart; n++) {
                    levels.push(n);
                }
            }
            spellMap[spell_id]["rarity"][rarity].levels = levels;
        }

		// Check for legendary not level 10
        if (
            spellMap[spell_id]["rarity"]["legendary"].start !== 0 &&
            spellMap[spell_id]["rarity"]["legendary"].start !== 10
        ) {
            SpellRegistry.getEnabledSpells().forEach(spell => {
				if (spell.getSpellId() !== spell_id) return;
				let min_legendary = spell.getMinLevelForRarity("legendary");
				let max_legendary = spell.getMaxLevel()
				

				let legendaryLevels = [];
				for (let i = min_legendary; i <= max_legendary; i++) {
					legendaryLevels.push(i);
				}
				spellMap[spell_id]["rarity"]["legendary"].levels = legendaryLevels;
			})
        }
    }

    return spellMap;
}

// Build the formatted spell index
global.formatted_spell_index = buildSpellIndex();

// Apply crafting modifications
for (let [spell_name, cratable] of spell_crafting_modifications) {
    global.formatted_spell_index[spell_name].craftable = cratable;
}

///Converts the spell map to an array of arrays grouped by school and rarity.
function spellMapToSchoolRarityGroups(spellMap) {
    const rarities = ["common", "uncommon", "rare", "epic", "legendary"];
    let groupMap = {};

    for (let spell_id in spellMap) {
        let spell = spellMap[spell_id];
        let modid = spell.modid;
        let spell_name = spell.spell_name;
        let school = spell.school;
        let craftable = spell.craftable;
        for (let rarity of rarities) {
            let start = spell.rarity[rarity].start;
            if (start !== 0) {
                let key = `${school}:${rarity}`;
                if (!groupMap[key]) groupMap[key] = [];
                groupMap[key].push([school, rarity, modid, spell_name, start, craftable]);
            }
        }
    }

    // Convert the map to an array of arrays, sorted by school and rarity
    let result = Object.keys(groupMap)
        .sort()
        .map(key => groupMap[key]);
    return result;
}

// Convert the formatted spell index to the desired array structure
global.crafting_spells_array = spellMapToSchoolRarityGroups(global.formatted_spell_index);