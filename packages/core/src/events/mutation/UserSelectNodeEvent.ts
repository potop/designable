import { ICustomEvent } from '@kdesignable/shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class SelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'user:select:node'
}
