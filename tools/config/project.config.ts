import { join } from 'path';

import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST = `${this.APP_DEST}/fonts`;
  FONTS_SRC = ['node_modules/font-awesome/fonts/**'];

  ACE_THEME_DEST = `${this.APP_DEST}`;
  ACE_THEME_DIR = ['node_modules/ace-builds/src-min-noconflict/theme-*.js'];

  constructor() {
    super();
    this.APP_TITLE = 'objShare';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      {src: 'normalize.css/normalize.css', inject: true},
      {src: 'ace-builds/src-min-noconflict/ace.js', inject: 'libs'},
      {src: 'ace-builds/src-min-noconflict/ext-language_tools.js', inject: 'libs'},
      {src: 'font-awesome/css/font-awesome.min.css', inject: true},
      {src: 'markdown-it/dist/markdown-it.min.js', inject: 'libs'},
      {src: 'tether/dist/js/tether.min.js', inject: 'libs'},
      {src: 'tether/dist/css/tether.min.css', inject: true},
      {src: 'tether-drop/dist/js/drop.min.js', inject: 'libs'},
      {src: 'tether-drop/dist/css/drop-theme-arrows.min.css', inject: true},
      {src: 'file-saver/FileSaver.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      {src: `${this.APP_SRC}/assets/libs/gml-api.js`, inject: true, vendor: false},
      {src: `${this.APP_SRC}/assets/libs/ace-gml.js`, inject: true, vendor: false},
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. lodash)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // }];
    //
    // or
    //
    // let additionalPackages: ExtendPackages[] = [];
    //
    // additionalPackages.push({
    //   name: 'lodash',
    //   path: `${this.APP_BASE}node_modules/lodash/lodash.js`,
    //   packageMeta: {
    //     main: 'index.js',
    //     defaultExtension: 'js'
    //   }
    // });
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
