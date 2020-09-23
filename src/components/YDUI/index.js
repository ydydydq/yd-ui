import './src/theme/base.css';

import YdIcon from './packages/Icon';
import YdButton from './packages/Button';
import YdRadio from './packages/Radio';
import YdCheckbox from './packages/Checkbox';
import YdCheckboxGroup from './packages/CheckboxGroup';
import YdInput from './packages/Input';
import YdSwitch from './packages/Switch';
import YdRate from './packages/Rate';
import YdBadge from './packages/Badge';
import YdSelect from './packages/Select';
import YdSelectOption from './packages/SelectOption';
import YdPagination from './packages/Pagination';
import YdCollapse from './packages/Collapse';
import YdCollapseItem from './packages/CollapseItem';
import YdLoading from './packages/Loading';
import YdMessage from './packages/Message';
import YdConfirm from './packages/Confirm';
import YdDialog from './packages/Dialog';
import YdPopover from './packages/Popover';
import YdImage from './packages/Image';
import YdEmpty from './packages/Empty';
import YdBacktop from './packages/Backtop';
import YdCollapseTransition from './src/transitions/collapse-transition';

const components = [
  YdIcon, YdButton, YdRadio, YdCheckbox, YdCheckboxGroup, YdInput, YdSwitch, YdRate, YdBadge,
  YdSelect, YdSelectOption, YdPagination, YdCollapse, YdCollapseItem, YdDialog, YdPopover, YdImage,
  YdEmpty, YdBacktop, YdCollapseTransition
];

const install = function(Vue, opts = {}) {
  Vue.use(YdLoading.directive);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$YD_Loading = YdLoading.service;
  Vue.prototype.$YD_Message = YdMessage.service;
  Vue.prototype.$YD_Confirm = YdConfirm.service;
};

/* istanbul ignore if */
if(typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  YdIcon,
  YdButton,
  YdRadio,
  YdCheckbox,
  YdCheckboxGroup,
  YdInput,
  YdSwitch,
  YdBadge,
  YdSelect,
  YdSelectOption,
  YdPagination,
  YdLoading,
  YdMessage,
  YdConfirm,
  YdDialog,
  YdPopover,
  YdImage,
  YdEmpty,
  YdBacktop,
  YdCollapseTransition
}
