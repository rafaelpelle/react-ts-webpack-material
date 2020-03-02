import * as React from 'react'
import MaterialButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader: React.FC<Props> = (props) => {
  const { color, variant, size } = props
  const thickness = size === 'small' ? 5 : size === 'large' ? 7 : 6
  const circularSize = size === 'small' ? 20 : size === 'large' ? 29 : 24
  const circularColor = color === 'primary' && variant === 'contained' ? 'secondary' : 'primary'
  return (
    <CircularProgress size={circularSize} thickness={thickness} color={circularColor} style={{ margin: '0 auto' }} />
  )
}

const Button: React.FC<Props> = (props) => (
  <MaterialButton
    color={props.color}
    size={props.size}
    variant={props.variant}
    fullWidth={props.fullWidth}
    disabled={props.disabled}
    style={{ ...props.style, minWidth: 150 }}
    onClick={props.onClick}
    disableRipple={false}
    disableFocusRipple
  >
    {!props.loading ? props.content : <Loader {...props} />}
  </MaterialButton>
)
export default Button

/////////////////////////////////////////////////////////////////
///////////////////////////// STYLES ////////////////////////////
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
type Color = 'inherit' | 'primary' | 'secondary' | 'default'
type Size = 'small' | 'medium' | 'large'
type Variant = 'text' | 'outlined' | 'contained'

interface OwnProps {
  content?: string
  color?: Color
  size?: Size
  variant?: Variant
  loading?: boolean
  disabled?: boolean
  disableRipple?: boolean
  disableFocusRipple?: boolean
  fullWidth?: boolean
  style?: any
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onClick?: (...args: any) => any
}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
