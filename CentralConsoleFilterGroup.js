# this is edit in local
# this is edit online
Ext.define("JP1.view.CentralConsoleFilterGroup",{
	extend:"Ext.panel.Panel",
	lang:null,
	isServere:false,
    frame:false,
    width:400,
    layout:{
        type:"border"
    },
    closable:false,
    collapsed:false,
    collapsible:true,
    overlapHeader:false,
    region:"east",
    initComponent:function(){
    	var me=this;
    	me.title=me.lang.getText("Filter Group");
    	var postID="1";
    	if(me.isServere){
    		postID="2";
    	}
    	
    	
    	var filterNameStore1=Ext.create("JP1.store.FilterNameStore");
    	var filterNameStore1RowEditing= Ext.create("Ext.grid.plugin.CellEditing", {
    		autoCancel: false,
    	    clicksToEdit: 0,
    	    dblclicksToEdit:1,
    	});
    	var filterConditionListStore1=Ext.create("JP1.store.FilterConditionListStore");
    	var filterConditionListStore1RowEditing=Ext.create("Ext.grid.plugin.CellEditing", {
    	    autoCancel: false,
    	    clicksToEdit: 0,
    	    dblclicksToEdit:1,
    	});
    	
    	var includeStore=new Ext.data.SimpleStore({
            fields: ["value", "text"],
            data : [ ["1","一致"],
                     ["2","不一致"],
                     ["3","包含"],
                     ["4","不包含"]
            ]
        });
    	var objTypeStore=new Ext.data.SimpleStore({
    		fields: ["value", "text"],
            data : [ ["1","ALARM"],
                     ["2","NO-ALARM"],
                     ["3","ALARM2"],
                     ["4","NO-ALARM2"]
            ]
    	});
    	var loginTypeStore=new Ext.data.SimpleStore({
    		fields: ["value", "text"],
            data : [ ["1","ALARM-TABLE"],
                     ["2","ALARM-CLOCK"],
                     ["3","ALARM2"],
                     ["4","NO-ALARM2"]
            ]
    	});
    	var outObject=false;
    	
    	var filterGroup=Ext.create("Ext.grid.Panel",{
                height:120,
                store:filterNameStore1,
                region:"north",
                dock:"top",
                overflowY:"auto",
                overflowX:"hidden",
                viewConfig:{
                    autoScroll:false
                },
                selType: "cellmodel",
                plugins: [filterNameStore1RowEditing],
                dockedItems:[{
                    xtype:"toolbar",
                    dock:"top",
                    items:[{
                        xtype:"button",
                        allowDepress:false,
                        enableToggle:false,
                        pressed:false,
                        text:me.lang.getText("Move Up"),
                        handler:function(){
                        	 var grid=this.ownerCt.ownerCt;
                        	 var direction=-1;
                        	 var record = grid.getSelectionModel().getSelection();
                        	 if (!record) {
                        		 return;
                        	 }
                        	 record=record[0];
                        	 var index = grid.getStore().indexOf(record);
                        	 if (direction < 0) {
                        		 index--;
                        		 if (index < 0) {
                        			 return;
                        		 }
                        	 }else{
                        		 index++;
                        		 if (index >= grid.getStore().getCount()) {
                        			 return;
                        		 }
                        	 }
                        	 grid.getStore().remove(record);
                        	 grid.getStore().insert(index, record);
                        	 grid.getSelectionModel().select(index, true);
                        }
                    },{
                        xtype:"button",
                        text:me.lang.getText("Move Down"),
                        handler:function(){
                        	 var grid=this.ownerCt.ownerCt;
                        	 console.log(grid);
                        	 var direction=1;
                        	 var record = grid.getSelectionModel().getSelection();
                        	 if (!record) {
                        		 return;
                        	 }
                        	 record=record[0];
                        	 var index = grid.getStore().indexOf(record);
                        	 var prevIndex=index;
                        	 if (direction < 0) {
                        		 index--;
                        		 if (index < 0) {
                        			 return;
                        		 }
                        	 }else{
                        		 index++;
                        		 if (index >= grid.getStore().getCount()) {
                        			 return;
                        		 }
                        	 }
                        	 grid.getStore().remove(record);
                        	 grid.getStore().insert(index, record);
                        	 grid.getSelectionModel().select(index, true);
                        	 grid.getSelectionModel().deselect(prevIndex,true);
                        }
                    },{
                        xtype:"button",
                        text:me.lang.getText("Add"),
                        handler:function(){
                        	filterNameStore1RowEditing.cancelEdit();
                            var r = Ext.create("JP1.model.FilterNameModel", {
                                Name: ""
                            });
                            filterNameStore1.insert(0, r);
                            filterNameStore1RowEditing.startEdit(0, 0);
                        }
                    },{
                        xtype:"button",
                        text:me.lang.getText("Delete"),
                        handler:function(){
                        	 var grid=this.ownerCt.ownerCt;
                        	 var record = grid.getSelectionModel().getSelection();
                        	 if (!record) {
                        		 return;
                        	 }
                        	 grid.getStore().remove(record);
                        }
                    }]
                }],
                columns:[{
                    xtype:"gridcolumn",
                    width:375,
                    overflowX:"hidden",
                    dataIndex:"FilterName",
                    sortable:false,
                    text:me.lang.getText("Filter Group"),
                    editor: {
                        xtype: "textfield",
                        allowBlank: false
                    },
                    handler:{
                    	itemclick:function(){
                    		console.log("item clicked");
                    	}
                    }
                }]
    	});
    	
    	//条件组
    	//var conditionList=[];
    	
    	var conditionGroupPanel=Ext.create("Ext.grid.Panel",{
    		height:120,
    		overflowY:"auto",
            store:filterConditionListStore1,
            region:"north",
            dock:"top",
            viewConfig:{
                autoScroll:false
            },
            selType: "cellmodel",
            plugins: [filterConditionListStore1RowEditing],
            dockedItems:[{
                xtype:"toolbar",
                dock:"top",
                items:[{
                    xtype:"button",
                    allowDepress:false,
                    enableToggle:false,
                    pressed:false,
                    text:me.lang.getText("Move Up"),
                    handler:function(){
                    	 var grid=this.ownerCt.ownerCt;
                    	 var direction=-1;
                    	 var record = grid.getSelectionModel().getSelection();
                    	 if (!record) {
                    		 return;
                    	 }
                    	 record=record[0];
                    	 var index = grid.getStore().indexOf(record);
                    	 if (direction < 0) {
                    		 index--;
                    		 if (index < 0) {
                    			 return;
                    		 }
                    	 }else{
                    		 index++;
                    		 if (index >= grid.getStore().getCount()) {
                    			 return;
                    		 }
                    	 }
                    	 grid.getStore().remove(record);
                    	 grid.getStore().insert(index, record);
                    	 grid.getSelectionModel().select(index, true);
                    }
                },{
                    xtype:"button",
                    text:me.lang.getText("Move Down"),
                    handler:function(){
                    	 var grid=this.ownerCt.ownerCt;
                    	 console.log(grid);
                    	 var direction=1;
                    	 var record = grid.getSelectionModel().getSelection();
                    	 if (!record) {
                    		 return;
                    	 }
                    	 record=record[0];
                    	 var index = grid.getStore().indexOf(record);
                    	 var prevIndex=index;
                    	 if (direction < 0) {
                    		 index--;
                    		 if (index < 0) {
                    			 return;
                    		 }
                    	 }else{
                    		 index++;
                    		 if (index >= grid.getStore().getCount()) {
                    			 return;
                    		 }
                    	 }
                    	 grid.getStore().remove(record);
                    	 grid.getStore().insert(index, record);
                    	 grid.getSelectionModel().select(index, true);
                    	 grid.getSelectionModel().deselect(prevIndex,true);
                    }
                },{
                    xtype:"button",
                    text:me.lang.getText("Add"),
                    handler:function(){
                    	filterConditionListStore1RowEditing.cancelEdit();
                        var r = Ext.create("JP1.model.FilterNameModel", {
                            Name: ""
                        });
                        filterConditionListStore1.insert(0, r);
                        filterConditionListStore1RowEditing.startEdit(0, 0);
                    }
                },{
                    xtype:"button",
                    text:me.lang.getText("Delete"),
                    handler:function(){
                    	 var grid=this.ownerCt.ownerCt;
                    	 var record = grid.getSelectionModel().getSelection();
                    	 if (!record) {
                    		 return;
                    	 }
                    	 grid.getStore().remove(record);
                    }
                }]
            }],
            columns:[{
                xtype:"gridcolumn",
                width:375,
                dataIndex:"ConditionName",
                sortable:false,
                text:me.lang.getText("Condition Group"),
                flex:1,
                editor: {
                    xtype: "textfield",
                    allowBlank: false
                }
            }]
    	});
    	if(me.isServere){
    		conditionGroupPanel.hidden=true;
    	}
    	
    	//var 
    	var filterDetailPanel=Ext.create("Ext.panel.Panel",{
    		width:380,
            height:450,
            overflowY:"auto",
            title:"条件组1",
            region:"north",
            layout:{
            	type:"table",
            	columns:3,
            	tableAttrs: {
            		borderSpacing: '0px 0px',
     	            align: 'left',
     	            valign:"top",
        	    }
            }, 
            items:[{
            	padding:"3 0 3 0",
            	xtype: "checkboxfield",
                boxLabel: "登录主机名",
                width:100,
                id:"HostNameCheckBox"+postID,
                checked:true,
	            baseCls:"gray tableBorder",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.setValue(true);
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.setValue(false);
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"textfield",
            	value:"hello",
            	width:175,
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                editable:false,
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	xtype: "checkboxfield",
                boxLabel: "重要度",
                id:"ImportanceCheckBox"+postID,
	            baseCls:"gray",
	            valign:"top",
	            checked:true,
	            width:100,
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	valign:"top",
            	xtype:"panel",
            	layout:{
            		type:"table",
            		columns:4
            	},
            	colspan:2,
            	width:280,
            	items:[{
            		xtype: "checkboxfield",
                    boxLabel: "紧急",
                    id:"EmergencyCheck"+postID,
                    width:70
                },{
            		xtype: "checkboxfield",
                    boxLabel: "警报",
                    id:"WarnReportCheck"+postID,
                    width:70
                },{
            		xtype: "checkboxfield",
                    boxLabel: "致命的",
                    id:"FatalCheck"+postID,
                    width:70
                },{
            		xtype: "checkboxfield",
                    boxLabel: "错误",
                    id:"ErrorCheck"+postID,
                    width:70
                },{
            		xtype: "checkboxfield",
                    boxLabel: "警告",
                    id:"WarnCheck"+postID
                },{
            		xtype: "checkboxfield",
                    boxLabel: "通知",
                    id:"NotiCheck"+postID
                },{
            		xtype: "checkboxfield",
                    boxLabel: "信息",
                    id:"InfoCheck"+postID
                },{
            		xtype: "checkboxfield",
                    boxLabel: "调试",
                    id:"DebugCheck"+postID
                }]
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "对象类型",
                id:"ObjectTypeCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:175,
            	store:objTypeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("ALARM");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	margin:"2 0 2 0",
            	xtype: "checkboxfield",
                boxLabel: "对象名",
                id:"ObjectNameCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	width:175,
            	xtype:"textfield",
            	text:"Pages/sec"
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "登录类型名",
                id:"LoginTypeCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:175,
            	store:loginTypeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("ALARM-TABLE");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "登录名",
                id:"LoginNameCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"textfield",
            	width:175
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "事件类型",
                id:"EventTypeCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"textfield",
            	width:175
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "用户名",
                id:"UserNameCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"textfield",
            	width:175
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "消息",
                id:"MessageCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"textfield",
            	width:175
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "产品名",
                id:"ProductNameCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"textfield",
            	width:175
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "事件ID",
                id:"EventIDCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.nextSibling().nextSibling().setDisabled(false);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            			this.nextSibling().nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	xtype:"textfield",
            	width:175
            },{
            	padding:"3 0 3 0",
            	xtype:"combobox",
            	width:100,
            	store:includeStore,
                valueField:"value",
                displayField:"text",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                selectOnFocus:true,
                allowBlank:false,
                listeners: {  
                    afterRender: function(combo) {
                    	combo.setValue("包含");  
                    }    
                }
            },{
            	padding:"3 0 3 0",
            	width:100,
            	xtype: "checkboxfield",
                boxLabel: "响应",
                id:"RespCheckBox"+postID,
                checked:true,
	            baseCls:"gray",
	            listeners:{
	            	change:function(ctl,newValue,oldValue){
	            		if(this.checked){
	            			this.nextSibling().setDisabled(false);
	            			this.setValue(true);
	            		}else{
	            			this.nextSibling().setDisabled(true);
	            		}
	            	}
	            }
            },{
            	padding:"3 0 3 0",
            	colspan:2,
            	xtype:"radiogroup",
            	vertical: false,
                width:200,
                layout:{
                    type:"hbox"
                },
                items:[{
                    xtype:"radiofield",
                    boxLabel:"对象",
                    name:"objectRadio",
                    width:80,
                    checked:true,
                    listeners:{
                    	change:function(obj1,newValue,oldValue,obj2){
                    		outObject=false;
                    	}
                    }
                },{
                    xtype:"radiofield",
                    boxLabel:"对象外",
                    name:"objectRadio",
                    checked:false,
                    listeners:{
                    	change:function(obj1,newValue,oldValue,obj2){
                    		outObject=true;
                    	}
                    }
                }]
            }],
            dockedItems:[{
                 dock:"bottom",
                 items:[{
                 	xtype:"toolbar",
                 	items:[{
                         xtype:"button",
                         width:80,
                         autoWidth:false,
                         text:me.lang.getText("Save"),
                         handler:function(){
                         	//TODO:获取所有输入
                        	var condition={};
                        	condition.filterName=selectedFilterName;//对应哪个过滤器
                        	condition.conditionName=selectedConditionName;//一个条件的名字，在上面表格的选中那一行。
                        	
                         	var hostNameCheckBox=Ext.getCmp("HostNameCheckBox"+postID);
                         	if(hostNameCheckBox.getValue()){
                         		condition.hostName=hostNameCheckBox.nextSibling().getValue();
                         		condition.hostNameIncludeType=hostNameCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.hostName=null;
                         		condition.hostNameIncludeType=null;
                         	}
                         	var importanceCheckBox=Ext.getCmp("ImportanceCheckBox"+postID);
                         	if(importanceCheckBox.getValue()){
                         		condition.importance=true;
                         		if(Ext.getCmp("EmergencyCheck"+postID).getValue()){
                         			condition.emergency=1;
                         		}else{
                         			condition.emergency=0;
                         		}
                         		if(Ext.getCmp("WarnReportCheck"+postID).getValue()){
                         			condition.warnReport=1;
                         		}else{
                         			condition.warnReport=0;
                         		}
                         		if(Ext.getCmp("FatalCheck"+postID).getValue()){
                         			condition.fatal=1;
                         		}else{
                         			condition.fatal=0;
                         		}
                         		if(Ext.getCmp("ErrorCheck"+postID).getValue()){
                         			condition.error=1;
                         		}else{
                         			condition.error=0;
                         		}
                         		if(Ext.getCmp("WarnCheck"+postID).getValue()){
                         			condition.warn=1;
                         		}else{
                         			condition.warn=0;
                         		}
                         		if(Ext.getCmp("NotiCheck"+postID).getValue()){
                         			condition.noti=1;
                         		}else{
                         			condition.noti=0;
                         		}
                         		if(Ext.getCmp("InfoCheck"+postID).getValue()){
                         			condition.info=1;
                         		}else{
                         			condition.info=0;
                         		}
                         		if(Ext.getCmp("DebugCheck"+postID).getValue()){
                         			condition.debug=1;
                         		}else{
                         			condition.debug=0;
                         		}
                         	}else{
                         		condition.importance=false;
                         	}
                         	var objectTypeCheckBox=Ext.getCmp("ObjectTypeCheckBox"+postID);
                         	if(objectTypeCheckBox.getValue()){
                         		condition.objectType=objectTypeCheckBox.nextSibling().getValue();
                         		condition.objectTypeIncludeType=objectTypeCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.objectType=null;
                         		condition.objectTypeIncludeType=null;
                         	}
                         	var objectNameCheckBox=Ext.getCmp("ObjectNameCheckBox"+postID);
                         	if(objectNameCheckBox.getValue()){
                         		condition.objectName=objectNameCheckBox.nextSibling().getValue();
                         		condition.objectNameIncludeType=objectNameCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.objectName=null;
                         		condition.objectNameIncludeType=null;
                         	}
                         	var loginTypeCheckBox=Ext.getCmp("LoginTypeCheckBox"+postID);
                         	if(loginTypeCheckBox.getValue()){
                         		condition.loginType=loginTypeCheckBox.nextSibling().getValue();
                         		condition.loginTypeIncludeType=loginTypeCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.loginType=null;
                         		condition.loginTypeIncludeType=null;
                         	}
                         	var loginNameCheckBox=Ext.getCmp("LoginNameCheckBox"+postID);
                         	if(loginNameCheckBox.getValue()){
                         		condition.loginName=loginNameCheckBox.nextSibling().getValue();
                         		condition.loginNameIncludeType=loginNameCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.loginName=null;
                         		condition.loginNameIncludeType=null;
                         	}
                         	var eventTypeCheckBox=Ext.getCmp("EventTypeCheckBox"+postID);
                         	if(eventTypeCheckBox.getValue()){
                         		condition.eventType=eventTypeCheckBox.nextSibling().getValue();
                         		condition.eventTypeIncludeType=eventTypeCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.eventType=null;
                         		condition.eventTypeIncludeType=null;
                         	}
                         	var userNameCheckBox=Ext.getCmp("UserNameCheckBox"+postID);
                         	if(userNameCheckBox.getValue()){
                         		condition.userName=userNameCheckBox.nextSibling().getValue();
                         		condition.userNameIncludeTyp=userNameCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.userName=null;
                         		condition.userNameIncludeType=null;
                         	}
                         	var messageCheckBox=Ext.getCmp("MessageCheckBox"+postID);
                         	if(messageCheckBox.getValue()){
                         		condition.message=messageCheckBox.nextSibling().getValue();
                         		condition.messageIncludeType=messageCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.message=null;
                         		condition.messageIncludeType=null;
                         	}
                         	var productNameCheckBox=Ext.getCmp("ProductNameCheckBox"+postID);
                         	if(productNameCheckBox.getValue()){
                         		condition.productName=productNameCheckBox.nextSibling().getValue();
                         		condition.productNameIncludeType=productNameCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.productName=null;
                         		condition.productNameIncludeType=null;
                         	}
                         	var eventIDCheckBox=Ext.getCmp("EventIDCheckBox"+postID);
                         	if(eventIDCheckBox.getValue()){
                         		condition.eventID=eventIDCheckBox.nextSibling().getValue();
                         		condition.eventIDIncludeType=eventIDCheckBox.nextSibling().nextSibling().getValue();
                         	}else{
                         		condition.eventID=null;
                         		condition.eventIDIncludeType=null;
                         	}
                         	var respCheckBox=Ext.getCmp("RespCheckBox"+postID);
                         	if(respCheckBox.getValue()){
                         		var x=respCheckBox.nextSibling().getChecked();
                         		condition.response=x[0].boxLabel;
                         	}else{
                         		condition.response=null;
                         	}
                         	condition.outObject=outObject;
                         	console.log("--------------filter------------------");
                         	console.log(condition);
                         	//submit the condition
                         	Ext.Ajax.request({
                         		url:"http://localhost:8080/JP1_IM/updateCondition",
                         		params:{
                         			condition:condition
                         		},
                         		method:"post",
                         		success:function(resp){
                         			
                         		},
                         		failure:function(resp){
                         			
                         		}
                         	});
                         }
                     },{
                         xtype:"button",
                         width:80,
                         text:me.lang.getText("Clear"),
                         handler:function(){
                         	//TODO
                        	var hostNameCheckBox=Ext.getCmp("HostNameCheckBox"+postID);
                          	hostNameCheckBox.nextSibling().setValue("");
                          	hostNameCheckBox.nextSibling().nextSibling().setValue("包含");
                          	
                          	//var importanceCheckBox=Ext.getCmp("ImportanceCheckBox"+postID);
                          	
                 
                          	var objectTypeCheckBox=Ext.getCmp("ObjectTypeCheckBox"+postID);
                          	objectTypeCheckBox.nextSibling().setValue("ALARM");
                          	
                          	var objectNameCheckBox=Ext.getCmp("ObjectNameCheckBox"+postID);
                          	objectNameCheckBox.nextSibling().setValue("");
                          	objectNameCheckBox.nextSibling().nextSibling().setValue("包含");
                          	
                          	var loginTypeCheckBox=Ext.getCmp("LoginTypeCheckBox"+postID);
                          	loginTypeCheckBox.nextSibling().setValue("Test-Mem");
                          	loginTypeCheckBox.nextSibling().nextSibling().setValue("包含");
                          	
                          	var loginNameCheckBox=Ext.getCmp("LoginNameCheckBox"+postID);
                          	loginNameCheckBox.nextSibling().setValue("");
                          	loginNameCheckBox.nextSibling().nextSibling().setValue("包含");
                          
                          	var eventTypeCheckBox=Ext.getCmp("EventTypeCheckBox"+postID);
                          	eventTypeCheckBox.nextSibling().setValue("");
                          	eventTypeCheckBox.nextSibling().nextSibling().setValue("包含");
                          	
                          	var userNameCheckBox=Ext.getCmp("UserNameCheckBox"+postID);
                          	userNameCheckBox.nextSibling().setValue("");
                          	userNameCheckBox.nextSibling().nextSibling().setValue("包含");
                          	
                          	var messageCheckBox=Ext.getCmp("MessageCheckBox"+postID);
                          	messageCheckBox.nextSibling().setValue();
                          	messageCheckBox.nextSibling().nextSibling().setValue("包含");
                          
                          	var productNameCheckBox=Ext.getCmp("ProductNameCheckBox"+postID);
                          	productNameCheckBox.nextSibling().setValue("");
                          	productNameCheckBox.nextSibling().nextSibling().setValue("包含");
                          	
                          	var eventIDCheckBox=Ext.getCmp("EventIDCheckBox"+postID);
                          	eventIDCheckBox.nextSibling().setValue("");
                          	eventIDCheckBox.nextSibling().nextSibling().setValue("包含");
                          	
                          	var respCheckBox=Ext.getCmp("RespCheckBox"+postID);
                          	respCheckBox.setValue("对象");
                         }
                     },{
                    	 xtype:"button",
                         width:80,
                         text:me.lang.getText("Search"),
                         handler:function(){
                         	//TODO:得到所有的条件组
                        	//var conditionList=[];
                        	
                        	 
                         }
                     },{
                         xtype:"button",
                         width:80,
                         text:me.lang.getText("Help"),
                         handler:function(){
                         	//TODO
                         }
                     }]
                 }]
             }] 
    	});

    	if(!me.isServere){
    		filterDetailPanel.height-=120;
    	}
    	/***********************total*******************************************/
        Ext.applyIf(me, {
        	layout:"vbox",
            items:[filterGroup,conditionGroupPanel,filterDetailPanel]
        });
        me.callParent(arguments);
    }
});
