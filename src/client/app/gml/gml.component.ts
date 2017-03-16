import { Component, AfterViewInit } from '@angular/core';
import { ObjectDataService } from '../shared/index';
import { StorageService } from '../shared/index';

/** Declare variables for the custom Ace highlighting. Prevents TS errors. */
declare var ace: any;
declare var gml_script_doc:any;
declare var gml_func_doc:any;
declare var gml_asset_ac:any;
declare var gml_parse_doc:any;
declare var gml_script_map:any;
declare var gml_var_ac:any;
declare var gml_func_ac:any;
declare var gml_const_ac:any;
declare var gml_keywords:any;

@Component({
  moduleId: module.id,
  selector: 'sd-gml',
  templateUrl: 'gml.component.html',
  styleUrls: ['gml.component.css']
})
export class GmlComponent implements AfterViewInit {
  /** Disable tslint - YAL ace code */
  /* tslint:disable */
  gml_keywords:string = 'globalvar|var|if|then|else|begin|end|for|while|do|until|repeat|switch|case|default|break|continue|with|exit|return|self|other|noone|all|global|local|mod|div|not|and|or|xor|enum|debugger';
  /* tslint:enable */

  /** Decalre a variable to store the editor reference */
  editor: any;

  /** Toggles showing the editor settings information */
  showSettings: boolean;

  /** Represents the editor settings bound to the settings elements */
  editorSettingsFontSize: number;
  editorSettingsTabSize: number;
  editorSettingsLineHighlighting: boolean;
  editorSettingsTheme: string;

  /** Temporary theme holder */
  previousTheme: string;

  /** Represents the actual editor settings */
  editorValueFontSize: number;
  editorValueTabSize: number;
  editorValueLineHighlighting: boolean;
  editorValueTheme: string;

  /** Default editor settings */
  default_font:any;
  default_tab:any;
  default_line:any;
  default_theme:any;

  /** Represents the currently editting event */
  current_event:string;

  /** Local storage keys */
  storeKeys:any = {
    font: 'objShare.editorFontSize',
    tab: 'objShare.editorTabSize',
    line: 'objShare.editorLineHighlighting',
    theme: 'objShare.editorTheme'
  };

  /**
   * Initialize componenet variables and inject services. Subscribes to the current event
   * in the ObjectDataService to update our editor with the correct GML. Also saves data
   * before the change.
   * @param {ObjectDataService} objectDataService - The injected ObjectDataService.
   * @constructor
   */
  constructor(private objectDataService: ObjectDataService, private storageService: StorageService) {
    this.current_event = '';
    this.showSettings = false;

    /** Set defaults */
    this.default_font = 12;
    this.default_tab = 4;
    this.default_line = true;
    this.default_theme = 'crimson_editor';

    /** Get settings from local storage */
    this.loadSettings();

    objectDataService.currentEvent.subscribe((event) => {
      if (event !== '') {
        if (this.current_event !== '') {
          this.objectDataService.saveGml(this.current_event, this.editor.getValue());
        }
        this.current_event = event.event;
        this.editor.setReadOnly(false);
        this.editor.setValue(event.gml, 0);
        this.editor.clearSelection();
        this.editor.gotoLine(0,0,false);
      } else {
        if (this.current_event !== '') {
          this.editor.clearSelection();
          this.editor.setValue('', 0);
          this.editor.setReadOnly(true);
          this.current_event = '';
        }
      }
    });
  }

  /**
   * Loads editor settings from local storage
   */
  loadSettings() {
    let font:any, tab:any, line:any, theme:any;
    font = Number( this.storageService.get(this.storeKeys.font, this.default_font) );
    tab = Number( this.storageService.get(this.storeKeys.tab, this.default_tab) );
    line = this.storageService.get(this.storeKeys.line, this.default_line);
    theme = this.storageService.get(this.storeKeys.theme, this.default_theme);

    /** Make sure values are valid */
    if (isNaN(font) || font > 64 || font < 8) {
      font = 12;
    }
    if (isNaN(tab) || tab < 1 || tab > 12) {
      font = 4;
    }
    if (typeof line !== 'boolean') {
      line = true;
    }
    if (typeof theme !== 'string') {
      theme = 'crimson_editor';
    }

    this.editorSettingsFontSize = this.editorValueFontSize = font;
    this.editorSettingsTabSize = this.editorValueTabSize = tab;
    this.editorSettingsLineHighlighting = this.editorValueLineHighlighting = line;
    this.editorSettingsTheme = this.editorValueTheme = theme;
  }

  /**
   * Inits our editor with the highlighting rules and autocompletion, also
   * binds a change listener to save the GML on every change.
   */
  ngAfterViewInit() {
    this.editor = ace.edit('editor');
    this.editor.setBehavioursEnabled(false);
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setMode('ace/mode/gml');
    this.editor.setReadOnly(true);
    this.editor.setShowPrintMargin(false);
    this.enableSBar(this.editor);
    this.enableAutoComplete(this.editor);

    /** Apply init settings to editor */
    this.editor.getSession().setTabSize(this.editorSettingsTabSize);
    document.getElementById('editor').style.fontSize = this.editorSettingsFontSize + 'px';
    this.editor.setHighlightActiveLine(this.editorSettingsLineHighlighting);
    this.editor.setTheme('ace/theme/' + this.editorSettingsTheme);

    let that = this;
    this.editor.on('change', function(e:Object) {
      if (that.current_event !== '') {
        /** Get editor content */
        let editorVal = that.editor.getValue();
        that.objectDataService.saveGml(that.current_event, editorVal);
      }
    });
  }

  /**
   * Changes the editor theme from the select
   */
  handleEditorTheme(e:any) {
    let select = e.srcElement;
    let themeName = select.options[select.selectedIndex].value;
    this.editor.setTheme('ace/theme/' + themeName);
    this.editorSettingsTheme = themeName;
  }

  /**
   * Show the editor settings information. Set the settings
   * bindings to be equal to actual editor values.
   */
  editorSettings() {
    this.editorSettingsFontSize = this.editorValueFontSize;
    this.editorSettingsTabSize = this.editorValueTabSize;
    this.editorSettingsLineHighlighting = this.editorValueLineHighlighting;
    this.editorSettingsTheme = this.editorValueTheme;
    this.previousTheme = this.editorSettingsTheme;

    this.showSettings = true;
  }

  /**
   * Change the editor settings inputs to be defaults.
   */
  editorDefaults() {
    this.editorSettingsFontSize = this.default_font;
    this.editorSettingsTabSize = this.default_tab;
    this.editorSettingsLineHighlighting = this.default_line;
    this.editorSettingsTheme = this.default_theme;
    this.editor.setTheme('ace/theme/' + this.editorSettingsTheme);
  }

  /**
   * Dismisses settings and undoes any temporary theme change
   */
  dismissSettings() {
    this.showSettings = false;
    this.editorSettingsTheme = this.previousTheme;
    this.editor.setTheme('ace/theme/' + this.editorSettingsTheme);
  }

  /**
   * Dismiss the editor settings modal, and apply changes to the editor.
   */
  saveEditorSettings() {
    /** Apply caps */
    if (Number(this.editorSettingsFontSize) < 8) { this.editorSettingsFontSize = 8; }
    if (Number(this.editorSettingsFontSize) > 64) { this.editorSettingsFontSize = 64; }
    if (Number(this.editorSettingsTabSize) < 1) { this.editorSettingsTabSize = 1; }
    if (Number(this.editorSettingsTabSize) > 12) { this.editorSettingsTabSize = 12; }

    /** Save vals to memory */
    this.editorValueFontSize = this.editorSettingsFontSize;
    this.editorValueTabSize = this.editorSettingsTabSize;
    this.editorValueLineHighlighting = this.editorSettingsLineHighlighting;
    this.editorValueTheme = this.editorSettingsTheme;

    /** Save to local storage */
    localStorage.setItem(this.storeKeys.font, this.editorValueFontSize.toString());
    localStorage.setItem(this.storeKeys.tab, this.editorValueTabSize.toString());
    localStorage.setItem(this.storeKeys.line, this.editorValueLineHighlighting.toString());
    localStorage.setItem(this.storeKeys.theme, this.editorValueTheme);

    /** Apply changes to editor */
    this.editor.getSession().setTabSize(this.editorSettingsTabSize);
    document.getElementById('editor').style.fontSize = this.editorSettingsFontSize + 'px';
    this.editor.setHighlightActiveLine(this.editorSettingsLineHighlighting);

    /** Dismiss modal */
    this.showSettings = false;
  }

  /**
   * Undo the last change to the editor
   */
  undo() {
    this.editor.undo();
  }

  /**
   * Reimplement last editor change
   */
  redo() {
    this.editor.redo();
  }

  /**
   * Bring up the ace find box
   */
   find() {
     this.editor.execCommand('find');
   }

   /** Disable tslint beyond this point. Following code coppied with permission from http://yal.cc/r/gml/ */
   /* tslint:disable */

  /**
   * Adds the status bar to the editor.
   * @param {any} editor - Ace editor reference
   */
  enableSBar(editor:any) {
    (function enableStatusBar() {
    	var statusBar = document.createElement('div');
    	statusBar.className = 'ace_status-bar';
    	//
    	var statusSpan = document.createElement('span');
    	statusSpan.setAttribute('width', '0%');
    	statusSpan.className = 'ace_status-hint';
    	statusBar.appendChild(statusSpan);
    	//
    	var statusHint = document.createElement('span');
    	statusHint.innerHTML = 'OK!';
    	statusHint.id = 'ace_status-hint';
    	statusBar.appendChild(statusHint);
    	//
    	document.getElementById('editor-container').appendChild(statusBar);
    	//
    	var lang = ace.require('ace/lib/lang');
    	var TokenIterator = ace.require('ace/token_iterator').TokenIterator;
    	var flowKeywords = (function() {
    		var m = 'if|then|else|begin|end|for|while|do|until|repeat|switch|case|default|break|continue|with|exit|return|enum|debugger'.split('|');
    		var r = Object.create(null);
    		for (var i = 0; i < m.length; i++) r[m[i]] = true;
    		return r;
    	})();
    	function updateComp(editor:any, row:any, col:any) {
    		var it = new TokenIterator(editor.session, row, col);
    		var func:any = null, index = 0, depth = 0;
    		var tk:any, z:any = 0;
    		//console.log('---');
    		while (tk = it.getCurrentToken()) {
    			var __break = true;
    			do {
    				//console.log(tk);
    				switch (tk.type) {
    					case 'keyword': if (flowKeywords[tk.value]) continue; else break;
    					case 'set.operator': continue;
    					case 'curly.paren.lparen': continue;
    					case 'curly.paren.rparen': continue;
    					case 'paren.lparen': depth--; break;
    					case 'paren.rparen': depth++; break;
    					case 'punctuation.operator':
    						switch (tk.value) {
    							case ',': if (depth == 0) index++; break;
    							case ';': continue;
    							default: //console.log(tk);
    						}
    						break;
    					case 'script':
    						if (depth < 0) { func = gml_script_doc[tk.value]; continue; };
    						break;
    					case 'function':
    						if (depth < 0) { func = gml_func_doc[tk.value]; continue; };
    						break;
    					default:
    				}
    				__break = false;
    			} while (false);
    			if (__break) break;
    			it.stepBackward();
    		}
    		//
    		statusHint.innerHTML = '';
    		if (func != null) {
    			var args = func.args;
    			var argc = args.length;
    			var rest = func.rest;
    			var out = document.createElement('span');
    			out.classList.add('hint');
    			out.appendChild(document.createTextNode(func.pre));
    			//
    			for (var i = 0; i < argc; i++) {
    				if (i > 0) out.appendChild(document.createTextNode(', '));
    				var span = document.createElement('span');
    				span.classList.add('argument');
    				if (i == index || i == argc - 1 && index >= i) span.classList.add('current');
    				span.appendChild(document.createTextNode(args[i]));
    				out.appendChild(span);
    			}
    			out.appendChild(document.createTextNode(func.post));
    			statusHint.appendChild(out);
    			statusHint.classList.remove('active');
    		}
    	}
    	var statusUpdate = lang.delayedCall(function(){
    		var status:any[] = [];
    		statusSpan.innerHTML = '';
    		function add(val:any, kind:any) {
    			if (!val) return;
    			val = ' ' + val;
    			if (kind) {
    				var span = document.createElement('span');
    				span.appendChild(document.createTextNode(val));
    				span.classList.add(kind);
    				statusSpan.appendChild(span);
    			} else statusSpan.appendChild(document.createTextNode(val));
    		}
    		//
    		var sel = editor.selection, c = sel.lead;
    		//
    		add(editor.keyBinding.getStatusText(editor), 'status');
    		//
    		if (editor.commands.recording) add('REC', 'recording');
    		//
    		if (!sel.isEmpty()) {
    			var r = editor.getSelectionRange();
    			add('(' + (r.end.row - r.start.row) + ':'  + (r.end.column - r.start.column) + ')', 'select');
    		}
    		//
    		add('Ln:', 'row-label');
    		add(c.row + 1, 'row');
    		add('Col:', 'col-label');
    		add(c.column + 1, 'col');
    		//
    		if (sel.rangeCount) add('[' + sel.rangeCount + ']', 'ranges');
    		//
    		updateComp(editor, c.row, c.column);
    	}.bind(this)).schedule.bind(null, 100);
    	editor.on('changeStatus', statusUpdate);
    	editor.on('changeSelection', statusUpdate);
    	editor.on('keyboardActivity', statusUpdate);
    	statusUpdate();
    })();
  }

  /**
   * Adds the GML autocompletion feature.
   * @param {any} editor - Ace editor reference
   */
  enableAutoComplete(editor:any) {
    var that = this;
    (function enableAutoCompletion() {
    	var langTools = ace.require('ace/ext/language_tools');
    	function getCompletionMode(tkType:any) {
    		switch (tkType) {
    			case 'comment': return 0;
    			case 'comment.doc': return 0;
    			case 'string': return 0;
    			case 'preproc': return 0;
    			default: return 1;
    		}
    	}
    	//{ AssetCompleter
    	var assetCompleter = {
    		getCompletions: function(editor:any, session:any, pos:any, prefix:any, callback:any) {
    			if (editor.completer) editor.completer.exactMatch = true;
    			var tk = session.getTokenAt(pos.row, pos.column);
    			var show = getCompletionMode(tk.type) == 1;
    			callback(null, show ? gml_asset_ac : []);
    		},
    	};
    	//}
    	//{ ScriptCompleter
    	var scriptReg = /#define[ \t]+(\w+)(?:\s+\/\/\/\s*(.+))?/g;
    	var scriptCompletionsId = -1;
    	var scriptCompletions: any = [];
    	function indexScripts() {
    		var map = Object.create(null);
    		var doc = Object.create(null);
    		var cpl:any[] = [];
    		var rx = scriptReg;
    		var src:any = editor.getValue(), mt:any;
    		rx.lastIndex = -1;
    		while (mt = rx.exec(src)) {
    			var s = mt[1];
    			var d = mt[2];
    			map[s] = 'script';
    			doc[s] = gml_parse_doc(d || s);
    			cpl.push({ name: s, value: s, score: 0, meta: 'script', doc: d });
    			rx.lastIndex = mt.index + 1;
    		}
    		gml_script_map = map;
    		gml_script_doc = doc;
    		scriptCompletions = cpl;
    	}
    	indexScripts();
    	var scriptCompleter = {
    		getCompletions: function(editor:any, session:any, pos:any, prefix:any, callback:any) {
    			var ec = editor.completer;
    			if (ec && ec.gatherCompletionsId != scriptCompletionsId) {
    				scriptCompletionsId = ec.gatherCompletionsId;
    				indexScripts();
    			}
    			var tk = session.getTokenAt(pos.row, pos.column);
    			var show = getCompletionMode(tk.type) == 1;
    			callback(null, show ? scriptCompletions : []);
    		},
    		getDocTooltip: function(item:any) {
    			return item.doc;
    		}
    	};
    	//}
    	//{ KeywordCompleter
    	var keywordData:any = [];
    	function addKeywordList(list:any) {
    		for (var i = 0; i < list.length; i++) {
    			keywordData.push(list[i]);
    		}
    	}
    	addKeywordList(gml_var_ac);
    	addKeywordList(gml_func_ac);
    	addKeywordList(gml_const_ac);
    	(function() {
    		var m = that.gml_keywords.split('|');
    		for (var i = 0; i < m.length; i++) {
    			var s = m[i];
    			keywordData.push({ name: s, value: s, score: 0, meta: 'keyword' });
    		}
    	})();
    	// related: comment out matches.sort(...) in ext-language_tools:setFilter,
    	// or it will accidentally shuffle the results.
    	keywordData.sort(function(a:any, b:any) {
    		return a.name < b.name ? -1 : 1;
    	});
    	var keyWordCompleter = {
    		getCompletions: function(editor:any, session:any, pos:any, prefix:any, callback:any) {
    			if (editor.completer) editor.completer.exactMatch = true;
    			var tk = session.getTokenAt(pos.row, pos.column);
    			var show = getCompletionMode(tk.type) == 1;
    			callback(null, show ? keywordData : []);
    		},
    		getDocTooltip: function(item:any) {
    			return item.doc;
    		}
    	};
    	//}
    	editor.setOptions({
    		enableLiveAutocompletion: [
    			scriptCompleter, keyWordCompleter, assetCompleter
    		]
    	});
    })();
  }

}
