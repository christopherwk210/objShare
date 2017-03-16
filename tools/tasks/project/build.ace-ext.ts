import * as gulp from 'gulp';
import Config from '../../config';

export = () => {
return gulp.src(Config.ACE_EXT_DIR)
      .pipe(gulp.dest(Config.ACE_THEME_DEST));
};
