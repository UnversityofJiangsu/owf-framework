/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dijit.layout.TabController"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit.layout.TabController"] = true;
dojo.provide("dijit.layout.TabController");

dojo.require("dijit.layout.StackController");

// Menu is used for an accessible close button, would be nice to have a lighter-weight solution
dojo.require("dijit.Menu");
dojo.require("dijit.MenuItem");

dojo.requireLocalization("dijit", "common", null, "ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw");

dojo.declare("dijit.layout.TabController",
	dijit.layout.StackController,
{
	// summary:
	// 		Set of tabs (the things with titles and a close button, that you click to show a tab panel).
	//		Used internally by `dijit.layout.TabContainer`.
	// description:
	//		Lets the user select the currently shown pane in a TabContainer or StackContainer.
	//		TabController also monitors the TabContainer, and whenever a pane is
	//		added or deleted updates itself accordingly.
	// tags:
	//		private

	templateString: "<div wairole='tablist' dojoAttachEvent='onkeypress:onkeypress'></div>",

	// tabPosition: String
	//		Defines where tabs go relative to the content.
	//		"top", "bottom", "left-h", "right-h"
	tabPosition: "top",

	// buttonWidget: String
	//		The name of the tab widget to create to correspond to each page
	buttonWidget: "dijit.layout._TabButton",

	_rectifyRtlTabList: function(){
		// summary:
		//		For left/right TabContainer when page is RTL mode, rectify the width of all tabs to be equal, otherwise the tab widths are different in IE

		if(0 >= this.tabPosition.indexOf('-h')){ return; }
		if(!this.pane2button){ return; }

		var maxWidth = 0;
		for(var pane in this.pane2button){
			var ow = this.pane2button[pane].innerDiv.scrollWidth;
			maxWidth = Math.max(maxWidth, ow);
		}
		//unify the length of all the tabs
		for(pane in this.pane2button){
			this.pane2button[pane].innerDiv.style.width = maxWidth + 'px';
		}
	}
});

dojo.declare("dijit.layout._TabButton",
	dijit.layout._StackButton,
	{
	// summary:
	//		A tab (the thing you click to select a pane).
	// description:
	//		Contains the title of the pane, and optionally a close-button to destroy the pane.
	//		This is an internal widget and should not be instantiated directly.
	// tags:
	//		private

	// baseClass: String
	//		The CSS class applied to the domNode.
	baseClass: "dijitTab",

	// Apply dijitTabCloseButtonHover when close button is hovered
	cssStateNodes: {
		closeNode: "dijitTabCloseButton"
	},

	templateString: dojo.cache("dijit.layout", "templates/_TabButton.html", "<div waiRole=\"presentation\" dojoAttachPoint=\"titleNode\" dojoAttachEvent='onclick:onClick'>\r\n    <div waiRole=\"presentation\" class='dijitTabInnerDiv' dojoAttachPoint='innerDiv'>\r\n        <div waiRole=\"presentation\" class='dijitTabContent' dojoAttachPoint='tabContent'>\r\n        \t<div waiRole=\"presentation\" dojoAttachPoint='focusNode'>\r\n\t\t        <img src=\"${_blankGif}\" alt=\"\" class=\"dijitIcon\" dojoAttachPoint='iconNode' />\r\n\t\t        <span dojoAttachPoint='containerNode' class='tabLabel'></span>\r\n\t\t        <span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" dojoAttachPoint='closeNode'\r\n\t\t        \t\tdojoAttachEvent='onclick: onClickCloseButton' waiRole=\"presentation\">\r\n\t\t            <span dojoAttachPoint='closeText' class='dijitTabCloseText'>x</span\r\n\t\t        ></span>\r\n\t\t\t</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"),

	// Override _FormWidget.scrollOnFocus.
	// Don't scroll the whole tab container into view when the button is focused.
	scrollOnFocus: false,

	postMixInProperties: function(){
		// Override blank iconClass from Button to do tab height adjustment on IE6,
		// to make sure that tabs with and w/out close icons are same height
		if(!this.iconClass){
			this.iconClass = "dijitTabButtonIcon";
		}
	},

	postCreate: function(){
		this.inherited(arguments);
		dojo.setSelectable(this.containerNode, false);

		// If a custom icon class has not been set for the
		// tab icon, set its width to one pixel. This ensures
		// that the height styling of the tab is maintained,
		// as it is based on the height of the icon.
		// TODO: I still think we can just set dijitTabButtonIcon to 1px in CSS <Bill>
		if(this.iconNode.className == "dijitTabButtonIcon"){
			dojo.style(this.iconNode, "width", "1px");
		}
	},

	startup: function(){
		this.inherited(arguments);
		var n = this.domNode;

		// Required to give IE6 a kick, as it initially hides the
		// tabs until they are focused on.
		setTimeout(function(){
			n.className = n.className;
		}, 1);
	},

	_setCloseButtonAttr: function(disp){
		this.closeButton = disp;
		dojo.toggleClass(this.innerDiv, "dijitClosable", disp);
		this.closeNode.style.display = disp ? "" : "none";
		if(disp){
			var _nlsResources = dojo.i18n.getLocalization("dijit", "common");
			if(this.closeNode){
				dojo.attr(this.closeNode,"title", _nlsResources.itemClose);
			}
			// add context menu onto title button
			var _nlsResources = dojo.i18n.getLocalization("dijit", "common");
			this._closeMenu = new dijit.Menu({
				id: this.id+"_Menu",
				dir: this.dir,
				lang: this.lang,
				targetNodeIds: [this.domNode]
			});

			this._closeMenu.addChild(new dijit.MenuItem({
				label: _nlsResources.itemClose,
				dir: this.dir,
				lang: this.lang,
				onClick: dojo.hitch(this, "onClickCloseButton")
			}));
		}else{
			if(this._closeMenu){
				this._closeMenu.destroyRecursive();
				delete this._closeMenu;
			}
		}
	},
	_setLabelAttr: function(/*String*/ content){
		// summary:
		//		Hook for attr('label', ...) to work.
		// description:
		//		takes an HTML string.
		//		Inherited ToggleButton implementation will Set the label (text) of the button; 
		//		Need to set the alt attribute of icon on tab buttons if no label displayed
			this.inherited(arguments);
			if(this.showLabel == false && !this.params.title){
				this.iconNode.alt = dojo.trim(this.containerNode.innerText || this.containerNode.textContent || '');
			}
		},

	destroy: function(){
		if(this._closeMenu){
			this._closeMenu.destroyRecursive();
			delete this._closeMenu;
		}
		this.inherited(arguments);
	}
});

}
