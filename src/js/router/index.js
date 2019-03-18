import Swupjs from 'swupjs';
import swupMergeHeadPlugin from 'swup/plugins/swupMergeHeadPlugin';

const router = new Swupjs({
  // debugMode: true,
  animations: {
    '*': {
      out(next) {
        next();
      },
      in(next) {
        next();
      }
    }
  }
});

router.usePlugin(swupMergeHeadPlugin, { runScripts: true });

export default router;
