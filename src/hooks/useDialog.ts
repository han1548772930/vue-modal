import type { ModalFuncProps } from '.'
import { confirm } from './confirm'
import { MyDialog } from '@/components/customUi/index'
// 在 useDialog.ts 中
export function useDialog(config: ModalFuncProps) {

    return confirm(config, MyDialog);
}