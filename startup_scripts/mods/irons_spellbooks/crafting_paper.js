StartupEvents.registry('item', event => {
	let items = [
		'common_paper',
		'uncommon_paper',
		'rare_paper',
		'epic_paper',
		'legendary_paper',
		
		'common_master_paper',
		'uncommon_master_paper',
		'rare_master_paper',
		'epic_master_paper',
		'legendary_master_paper',
	]
	for (let paper of items) {
		event.create(paper)
	}
})