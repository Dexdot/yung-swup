import Tabs from '../components/tabs';

$('.js-init-tabs').each((i, el) => {
  const tabs = new Tabs();
  tabs.init(el);
});
