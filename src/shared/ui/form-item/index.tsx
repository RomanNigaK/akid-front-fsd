import { FormItemProps } from 'antd';
import { StyledFormItem } from './styled';

type Props = FormItemProps;
export const Form = ({ ...props }: Props) => {
  return <StyledFormItem {...props} />;
};
