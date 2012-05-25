Ext.define('cfa.store.Cases', {
    extend: 'Ext.data.TreeStore',
    
    requires: ['cfa.model.Case'],

    config :{
        autoLoad: true,
        model: 'cfa.model.Case',
        defaultRootProperty: 'items',
		data: {
                items: [{
                        text: 'Case 2',
                        items: [{
                                text: 'Compaq',
                                id: 'overview',
                                artifactType: 'System',
                                items: [{
                                        text:'HP Flash Drive',
                                        artifactType: 'Storage',
                                        id: 'Leaf5',
                                        leaf: true
                                    }
                                ]
                            }, {
                                text:'Kingston Flash Drive',
                                artifactType: 'Storage',
                                id: 'Leaf1',
                                leaf: true
                            }, {
                                text:'House Image',
                                artifactType: 'Photo',
                                id: 'Leaf2',
                                leaf: true
                            }, {
                                text:'Testimony Doc',
                                artifactType: 'Document',
                                id: 'Leaf3',
                                leaf: true
                            }, {text:'CD',
                                artifactType: 'Media',
                                id: 'Leaf6',
                                leaf: true
                            }, {
                                text:'iPhone',
                                artifactType: 'Mobile',
                                id: 'Leaf7',
                                leaf: true
                            }
                        ],
                        artifactType: 'Case'  
                    }, {
                        text: 'TA07QR11TA0040',
                        artifactType: 'Case',
                        id: 'Leaf',
                        leaf: true
                    }, {
                        text:'Case 77',
                        artifactType: 'Case',
                        id: 'Leaf4',
                        leaf: true
                    }
                ]
        }
    }		
});
