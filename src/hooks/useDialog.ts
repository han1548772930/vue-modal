import type { ModalFuncProps } from '.'
import { confirm } from './confirm'
import MyDialog from '@/components/customUi/dialog/index.vue'

export const useDialog = (config: ModalFuncProps) => {
    return confirm(config, MyDialog)
}