import { type ModalFuncProps } from '.'
import { confirm } from './confirm'
import { MyAlertDialog } from '@/components/customUi/index'


export const useAlertDialog = (config: ModalFuncProps) => {
  return confirm(config, MyAlertDialog)
}