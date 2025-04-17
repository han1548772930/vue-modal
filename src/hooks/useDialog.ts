import type { ModalFuncProps } from '.'
import { confirm } from './confirm'
import { MyDialog } from '@/components/customUi/index'
export const useDialog = (config: ModalFuncProps) => {
    return confirm(config, MyDialog)
}