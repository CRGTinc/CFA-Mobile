Ext.define('cfa.view.setting.ImportDataView', {
			extend : 'Ext.navigation.View',

			config : {
				modal : true,
				layout : 'fit',
				hideOnMaskTap : true,
				hidden : true,
				top : 0,
				left : 0,
				width : 400,
				height : 400,
				scrollable : true,
				items : [{
							xtype : 'toolbar',
							docked : 'top',
							title : 'Import Data'

						}, {
							xtype : 'list',
							fullScreen : true,
							itemTpl : "{name}",
							store : me.getImportStore(),
							grouped : true,
							listeners : {
								select : {
									fn : onItemSelected,
									scope : me
								}
							}
						}]

			}

		})