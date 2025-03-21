import { type ModalFuncProps } from '.'
import { confirm } from './confirm'
import MyAlertDialog from '@/components/customUi/alertDialog/index.vue'


export const useAlertDialog = (config: ModalFuncProps) => {
  return confirm(config, MyAlertDialog)
}